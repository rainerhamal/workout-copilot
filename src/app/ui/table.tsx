// import { useEffect, useState } from "react";
import { getWorkoutPlans, getCopilotResponses } from '../lib/data';

export default async function WorkoutPlanTable ()
{
    // Fetch workout plans and copilot responses
    const workoutPlans = await getWorkoutPlans();
    const copilotResponses = await getCopilotResponses();

    return (
        // Main Div
        <div className="flex gap-2">
            {/* Left Table */ }
            <div className="overflow-y-auto h-[670px] rounded-lg shadow">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden ring-1 ring-neutral-800 rounded-lg">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead className="bg-neutral-800">
                                <tr>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">ID</th>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Date</th>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Name</th>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Set</th>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Reps</th>
                                </tr>
                            </thead>

                            <tbody className="bg-neutral-900">
                                { workoutPlans?.map( ( workoutPlan ) => (
                                    <tr key={ workoutPlan.id }>
                                        <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ workoutPlan.id }</td>
                                        <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ new Date( workoutPlan.date ).toLocaleDateString() }</td>
                                        <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ workoutPlan.name }</td>
                                        <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ workoutPlan.sets }</td>
                                        <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ workoutPlan.reps }</td>
                                    </tr>
                                ) ) }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Table */ }
            <div className="w-1/2 flex flex-col gap-6 h-[670px]">
                <div className="overflow-y-auto h-[670px] rounded-lg shadow">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden ring-1 ring-neutral-800 rounded-lg">
                            <table className="min-w-full border-separate border-spacing-0">
                                <thead className="bg-neutral-800">
                                    <tr>
                                        <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">ID</th>
                                        <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Recommendation</th>
                                        <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Workout ID</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-neutral-900">
                                    { copilotResponses?.map( ( copilotResponse ) => (
                                        <tr key={ copilotResponse.id }>
                                            <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ copilotResponse.id }</td>
                                            <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ copilotResponse.recommendation }</td>
                                            <td className="border border-neutral-700 px-4 py-2 text-sm text-white">{ copilotResponse.workoutplan_id }</td>
                                        </tr>
                                    ) ) }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}