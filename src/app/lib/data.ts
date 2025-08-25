import { workoutPlan, copilotResponse } from '../lib/definition';
import { unstable_noStore as noStore } from 'next/cache';
import { Pool } from 'pg';

const pool = new Pool( {
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
} );

export async function getWorkoutPlans ()
{
    noStore();
    console.log( "Fetching workout plans from database..." );

    try
    {
        const workoutPlans = await pool.query<workoutPlan & { copilotresponse_id: string | null, recommendation: string | null, copilotresponse_date: string | null }>(
            `
            SELECT
                w.id,
                w.date,
                w.name,
                w.sets,
                w.reps,
                c.id AS copilotresponse_id,
                c.recommendation,
                c.date AS copilotresponse_date
            FROM workoutplan w
            LEFT JOIN copilotresponse c ON w.id = c.workoutplan_id
            `
        );
        return workoutPlans.rows;
    } catch ( error )
    {
        console.error( 'Database Error:', error );
        throw new Error( 'Failed to fetch transactions.' );
    }
}

export async function getCopilotResponses ()
{
    noStore();
    console.log( "Fetching workout plans from database..." );

    try
    {
        const copilotResponses = await pool.query<copilotResponse>(
            `
            SELECT
                c.id,
                c.date,
                c.recommendation,
                c.workoutplan_id
            FROM copilotresponse c
            `
        );
        return copilotResponses.rows;
    } catch ( error )
    {
        console.error( 'Database Error:', error );
        throw new Error( 'Failed to fetch transactions.' );
    }
}