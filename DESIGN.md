# Scope to Deliver

## A. Design

### 1. Architecture Diagram
- **Frontend:** Next.js (React, App Router, Tailwind)
- **Backend:** Next.js API routes (Vercel serverless functions)
- **Database:** PostgreSQL (Vercel Postgres or Supabase)
- **AI:** Vercel AI SDK (OpenAI GPT-4o), LangChain/LangGraph, LangSmith
- **Real-time:** Supabase (for table sync)
- **External Services:** OpenAI API, Supabase

---

### 2. Data Model (ERD)

#### Core Tables

- **user**
  - id (PK)
  - email
  - password_hash (if not using external auth)
  - name
  - created_at

- **workoutplan**
  - id (PK)
  - user_id (FK → user.id)
  - name
  - date
  - created_at

- **workout_exercise**
  - id (PK)
  - workoutplan_id (FK → workoutplan.id)
  - exercise_id (FK → exercise.id)
  - sets
  - reps
  - order

- **exercise**
  - id (PK)
  - name
  - description
  - muscle_group

- **copilotresponse**
  - id (PK)
  - workoutplan_id (FK → workoutplan.id)
  - date
  - recommendation (text)
  - explanation (text)
  - disclaimer (text)

- **supplement_recommendation**
  - id (PK)
  - copilotresponse_id (FK → copilotresponse.id)
  - supplement_id (FK → supplement.id)
  - reason (text)
  - source_url

- **supplement**
  - id (PK)
  - name
  - description

- **ingredient**
  - id (PK)
  - name
  - fda_compliant (boolean)
  - compliance_source_url

- **supplement_ingredient**
  - id (PK)
  - supplement_id (FK → supplement.id)
  - ingredient_id (FK → ingredient.id)
  - amount

---

### 3. API Spec

- `POST /api/chat`: `{ messages: UIMessage[] }` → `{ response: string, ... }`
- `GET /api/workoutplans`: Returns all workout plans (+ joined copilot responses)

---

### 4. AI Flow

- **Minimal Prototype:** Used Vercel AI SDK for rapid prototyping (no LangChain/LangGraph).
- **Prompt:** System prompt includes FDA compliance instructions, source citation, and guardrails.
- **Guardrails:** Prompt engineering (no DDL, only SELECT/INSERT/UPDATE/DELETE).
- **Citations:** Copilot includes a source field in its recommendation.
- **LangChain/LangGraph:** For a full production app, LangChain or LangGraph can help with:
  - Complex multi-step reasoning
  - Tool orchestration (retrieval, search, DB, compliance check)
  - More robust prompt/response validation
  - Easier integration of multiple LLMs or tools
  - **Conclusion:** For a quick prototype, Vercel AI SDK is sufficient. For a full-blown, production-grade, auditable, and extensible copilot, LangChain or LangGraph is recommended.

---

### 5. Compliance Strategy

- **Prototype:** Prompt instructs the AI to only recommend FDA-compliant ingredients and cite sources (FDA.gov, USDA, etc.).
- **Full App:** Would integrate a compliance database or API, and validate recommendations programmatically.

---

### 6. Deployment & DevOps

- **Deploy:** Vercel (frontend, backend, serverless API)
- **Database:** Vercel Postgres or Supabase
- **Logging/Monitoring:** Vercel dashboard, Supabase logs, LangSmith
- **Rollback:** Vercel deploy history, database backups

---

### 7. Security & Privacy

- **Auth:** Not implemented in prototype; would use NextAuth or Supabase Auth for production.
- **Secrets:** Stored in `.env.local` (never committed)
- **Rate Limiting:** Not in prototype; add middleware for production.
- **Abuse Prevention:** Prompt guardrails, input validation.

---

### 8. Costs & Performance

- **LLM Usage:** Minimized by prompt length and step limits.
- **Caching:** Not implemented; could cache recommendations.
- **Batching:** Not implemented; could batch DB/API calls.
- **Indexes:** Primary keys and foreign keys on tables.
- **Cold Starts:** Mitigated by Vercel serverless infra.

---

### 9. Work Plan (Next 30 Days)

- **Week 1:** Auth, user accounts, basic CRUD for workouts
- **Week 2:** Robust AI flow (LangChain/LangGraph), compliance DB integration
- **Week 3:** UI/UX polish, error handling, logging, rate limiting
- **Week 4:** Testing, monitoring, deployment, docs