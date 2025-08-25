import Image from "next/image";
import { Suspense } from "react";
import WorkoutPlanTable from "../ui/table";
import Chat from "../ui/chatBox";
// import ThemeToggle from "../ui/ThemeToggle";

export default function Home ()
{
  // const query = searchParams?.query || '';

  return (
    <div className="flex min-h-screen flex-col p-6">
      <nav className="flex h-20 shrink-0 items-end rounded-lg bg-neutral-900 p-4 md:h-20">
        <h1 className="text-4xl font-bold">Workout Copilot</h1>
        {/* <ThemeToggle /> */}
      </nav>
      <main className="flex grow flex-col gap-4 md:flex-row bg-neutral-900 mt-4 overflow rounded-lg">
        <div className="flex-1 max-h-[calc(100vh-8rem)] p-4">
          <WorkoutPlanTable />
        </div>
        <div className="w-full md:w-[400px] border-l border-neutral-800 overflow-y-auto max-h-[calc(100vh-8rem)] p-4">
          <Chat />
        </div>
      </main>
    </div>
  );
}