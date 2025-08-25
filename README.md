# Workout Copilot

A minimal working prototype of a Next.js app for managing workout plans and supplement recommendations, featuring:

- Next.js 15 (App Router)
- PostgreSQL (via Vercel Postgres or Supabase)
- AI-powered chat (OpenAI, LangChain, ai-sdk)
- Real-time updates with Supabase
- TypeScript, Tailwind CSS, and modern UI

## Features

- Create, view, and manage workout plans
- AI chat copilot recommends supplements based on your workout
- Each recommendation is tied to a workout plan
- Real-time table updates when data changes
- Modern, responsive UI

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/workout-copilot.git
cd workout-copilot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add:
```
POSTGRES_URL=your_postgres_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Database setup
- Ensure your database has the following tables:
	- `workoutplan` (id, date, name, sets, reps)
	- `copilotresponse` (id, workoutplan_id, date, recommendation)
- You can use the provided seed script:
```bash
npm run seed
```

### 5. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Supabase
- OpenAI, LangChain, ai-sdk

## License
MIT
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
