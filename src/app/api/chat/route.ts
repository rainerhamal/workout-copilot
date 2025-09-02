import { openai } from '@ai-sdk/openai';
import { streamText, tool, stepCountIs, convertToModelMessages, UIMessage  } from 'ai';
import { z } from 'zod';
import { runGeneratedSQLQuery } from '@/app/lib/action';

export const maxDuration = 20;

const runGeneratedSQLQueryTool = tool({
    description: "Executes a SQL query against the connected PostgreSQL database and returns the results.",
    inputSchema: z.object({
        query: z.string().describe("The SQL query to execute. "),
    }),
    execute: async ({ query }: { query: string }) => {
        const results = await runGeneratedSQLQuery(query);
        return { results };
    }
} as const);

const systemPrompt = `You are a workout and supplement copilot. You have access to a PostgreSQL database with the following tables:

    workoutplan (
        id uuid not null default gen_random_uuid (),
        date date not null,
        name text not null,
        sets integer not null,
        reps integer not null,
    );

    copilotresponse (
        id uuid not null default gen_random_uuid (),
        workoutplan_id uuid not null,
        date date not null,
        recommendation text not null,
    );

    -users can design workouts(exercise, sets, reps,schedule), ask users about these details if not provided.
    -recommend supplements around user's workout plan.
    -ask for their workout plan first.
    -always ask for the user's date to  shcedule the workout plan.
    -If the information is vague always ask and confirm with user.
    -do not explicitly inform them about recommending supplements, just include it in your response after they have provided their workout plan.
    -Only FDA-permitted, compliant ingredients are allowed in the supplements you recommend.
    -check the USA https://www.fda.gov/ for the list of FDA-permitted ingredients.
    -check https://fdc.nal.usda.gov/ for nutritional information on supplements.
    -check other reputable sources for information on supplements but always check them against FDA regulations.
    -you must explain why each recommendation was made and cite your sources for each ingredient's compliance status.
    -always give disclaimer that the user should consult a healthcare professional before taking any supplements and to check the FDA website for the most up-to-date information on supplement regulations.
    -always confirm with user if the workout plan is correct before recommending supplements.
    -Before recommending supplements, confirm with user what their fitness goals are.
    -after recommending supplements, ask user if they would like to  save teh work out plan and supplement recommendation to the database.
    -include the reference links when saving the recommendation/s to the database.
    -allow multiple entries of workout plan per exercise. adjust accordingly on which workout plan is related to which supplement recommendation when saving to the database.
    -if a user set's multiple workout plans during a single chat, and the recommendation is the same for all workout plans, save the same recommendation for each workout plan in the database.
    -do not allow users to create table or delete table or drop table or alter table or truncate table or grant or revoke permissions.
    -only allow users to run SELECT, INSERT, UPDATE, DELETE queries.
`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log( '[POST] Incoming messages:', messages );

  // Convert UIMessage[] to ModelMessage[]
  const modelMessages = convertToModelMessages(messages);

  const result = streamText( {
    model: openai( 'gpt-4o' ),
    system: systemPrompt,
    messages: modelMessages,
    stopWhen: stepCountIs(5),
    tools: {
      // generateQueryTool,
      runGeneratedSQLQueryTool
    },
    toolChoice: 'auto',
  } );

  console.log( 'Generated route result:', result );

  return result.toUIMessageStreamResponse();
}