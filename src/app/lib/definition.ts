export type defintion = {
    id: string;
    name: string;
    height: number;
    weight: number;
    age: number;
    body_type: string;
}

export type workoutPlan = {
    id: string;
    date: string;
    name: string;
    sets: number;
    reps: number;
}

export type copilotResponse = {
    id: string;
    recommendation: string;
}

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    query: string;
}

export type Result = Record<string, string | number>;