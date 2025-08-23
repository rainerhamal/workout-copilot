

export default function WorkoutPlanTable () {
    return (
        // Main Div
        <div className="flex gap-4">
            {/* Left Table */}
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
                                <tr>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Workout ID</td>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Workout Date</td>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Workout Name</td>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Workout Sets</td>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Workout Reps</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Table */}
            <div className="overflow-y-auto h-[670px] rounded-lg shadow">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden ring-1 ring-neutral-800 rounded-lg">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead className="bg-neutral-800">
                                <tr>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">ID</th>
                                    <th className="border border-neutral-700 px-4 py-2 text-left text-sm font-semibold text-white">Recommendation</th>
                                </tr>
                            </thead>

                            <tbody className="bg-neutral-900">
                                <tr>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Recommendation ID</td>
                                    <td className="border border-neutral-700 px-4 py-2 text-sm text-white">Recommendation</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}