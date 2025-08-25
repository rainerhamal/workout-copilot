import { db } from "@vercel/postgres";
import 'dotenv/config';
// import { Pool } from 'pg';

// const pool = new Pool( {
//     connectionString: process.env.POSTGRES_URL,
//     ssl: { rejectUnauthorized: false },
// } );

export async function seedWorkoutPlan(client) {
    const createTable = await client.sql
        `CREATE TABLE IF NOT EXISTS workoutplan (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
            date DATE NOT NULL,
            name TEXT NOT NULL,
            sets INTEGER NOT NULL,
            reps INTEGER NOT NULL
        )`;
    console.log("Created workoutplan table");

    return {
        createTable,
    };
} 

export async function seedCopilotResponse(client) {
    const createTable = await client.sql
        `CREATE TABLE IF NOT EXISTS copilotresponse (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
            workoutplan_id UUID NOT NULL REFERENCES workoutplan(id),
            date DATE NOT NULL,
            recommendation TEXT NOT NULL
        )`;
    console.log("Created copilot response table");

    return {
        createTable,
    };
}

export async function main () {
    const client = await db.connect();

    await seedWorkoutPlan(client);
    await seedCopilotResponse(client);

    await client.release();
}

main()
    .then( () => {
        console.log( "Seeding completed" );
        process.exit( 0 );
    } )
    .catch( ( error ) => {
        console.error( "Seeding failed:", error );
        process.exit( 1 );
    } );
