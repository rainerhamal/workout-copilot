"use server";

import { Pool } from 'pg';
import { Result } from './definition';

const pool = new Pool( {
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
} );

export const runGeneratedSQLQuery = async ( query: string ) =>
{
    "use server";
    // Ensure the query is a SELECT statement. Otherwise, throw an error
    const forbidden = [ 'drop', 'alter', 'truncate', 'create', 'grant', 'revoke' ];
    const queryType = query.trim().toLowerCase().split( /\s+/ )[ 0 ];

    if ( forbidden.some( keyword => query.toLowerCase().includes( keyword ) ) )
    {
        throw new Error( "Forbidden SQL operation detected" );
    }

    if ( ![ 'select', 'insert', 'update', 'delete' ].includes( queryType ) )
    {
        throw new Error( "Only SELECT, INSERT, UPDATE, and DELETE queries are allowed" );
    }

    let data;
    try
    {
        data = await pool.query( query );
    } catch ( e )
    {
        if (
            typeof e === "object" &&
            e !== null &&
            "message" in e &&
            typeof (e as Error).message === "string" &&
            (e as Error).message.includes('relation "transactions" does not exist')
        ) {
            console.log(
                "Table does not exist, creating and seeding it with dummy data now...",
            );
            // throw error
            throw Error("Table does not exist");
        } else {
            throw e;
        }
    }

    return data.rows as Result[];
};