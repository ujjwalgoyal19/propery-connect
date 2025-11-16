# Propery Connect - AI Coding Agent Guide

## Project Architecture

This is a **Turborepo monorepo** for a property listings platform with strict separation between frontend and backend:

- `apps/web/` - Next.js 14 (App Router) frontend
- `apps/api/` - Express.js backend API
- `apps/docs/` - Mintlify documentation site
- `packages/shared-types/` - Shared Zod schemas and TypeScript types
- `packages/ui/` - Reusable React components
- `packages/typescript-config/` - Shared TypeScript configs
- `packages/eslint-config/` - Shared ESLint rules

**Key Principle**: Types and validations are defined ONCE in `packages/shared-types` and imported by both apps to ensure consistency.

## Development Workflow

### Running the Project

```bash
# Start all services (parallel dev servers)
npm run dev

# Start individual apps
npm run dev --workspace=@propery-connect/web   # Frontend on :3000 (or :3001 if 3000 in use)
npm run dev --workspace=@propery-connect/api   # Backend on :3005
npm run dev --workspace=@propery-connect/docs  # Docs on :3001 (requires Mintlify CLI)
```

### Build & Quality Checks

```bash
npm run build        # Builds all packages (respects dependencies)
npm run type-check   # TypeScript validation across monorepo
npm run lint         # ESLint for all workspaces
npm run format       # Prettier formatting
```

**Important**: Turborepo uses `pipeline` key in `turbo.json` (v1.x+). The `dev` task is marked as persistent to keep servers running.

## Code Patterns & Conventions

### 1. Path Aliases

Backend uses `@/*` for src imports:

```typescript
import { env } from '@/config/env';
import { authMiddleware } from '@/middleware/auth';
import { successResponse } from '@/utils/response';
```

### 2. Type-Safe Validation Flow

All request validation uses Zod schemas from `@propery-connect/shared-types`:

```typescript
// In packages/shared-types/src/validations/listing.ts
export const createListingSchema = z.object({
  title: z.string().min(5).max(200),
  // ... other fields
});

// In apps/api/src/routes/listings.routes.ts
import { createListingSchema } from '@propery-connect/shared-types';
import { validate } from '@/middleware/validate';

router.post('/', validate(createListingSchema), createListing);
```

The `validate` middleware automatically parses request bodies and returns 400 errors with field-level validation messages.

### 3. API Response Pattern

Use standardized response helpers from `@/utils/response`:

```typescript
import { successResponse, errorResponse, paginatedResponse } from '@/utils/response';

// Success
return successResponse(res, data, 'Listing created', 201);

// Error
return errorResponse(res, 'Not found', undefined, 404);

// Paginated
return paginatedResponse(res, listings, page, limit, total);
```

### 4. Environment Configuration

Backend validates env vars at startup using Zod (`apps/api/src/config/env.ts`):

- Process exits immediately if required vars are missing
- All env vars are strongly typed via `env` object
- Never access `process.env` directly in services/controllers

### 5. Database Access Pattern

All database operations use Supabase client with:

- Table names from `TABLE_NAMES` constant in `shared-types`
- Service layer abstractions (`apps/api/src/services/`)
- Row-Level Security (RLS) policies defined in `supabase/migrations/`

Example service pattern:

```typescript
import { type Listing, TABLE_NAMES } from '@propery-connect/shared-types';

import supabase from '@/config/supabase';

export async function getListingById(id: string): Promise<Listing | null> {
  const { data, error } = await supabase
    .from(TABLE_NAMES.LISTINGS)
    .select('*')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}
```

### 6. Frontend API Client

Uses custom `apiClient` wrapper (`apps/web/src/lib/api/client.ts`):

```typescript
import { api } from '@/lib/api/client';

// Automatically handles JSON, headers, and error parsing
const listings = await api.get<ListingsResponse>('/listings');
await api.post('/listings', createData);
```

### 7. Middleware Stack Order

Backend middleware MUST be registered in this order (see `apps/api/src/index.ts`):

1. `helmet()` - Security headers
2. `cors()` - CORS configuration
3. `express.json()` - Body parsing
4. Request logging
5. Route handlers (`/api` prefix)
6. `errorHandler` - Global error handling (ALWAYS LAST)

## Integration Points

### Third-Party Services

All clients configured in `apps/api/src/config/`:

- **Supabase** (`supabase.ts`) - PostgreSQL database with RLS
- **Twilio** (`twilio.ts`) - WhatsApp messaging via Twilio API
- **Razorpay** (`razorpay.ts`) - Payment processing

Import pre-configured clients, never instantiate directly:

```typescript
import razorpayInstance from '@/config/razorpay';
import supabase from '@/config/supabase';
import twilioClient from '@/config/twilio';
```

### Cross-App Communication

Frontend → Backend: REST API only (no direct database access)

- Frontend uses `NEXT_PUBLIC_API_URL` env var
- Backend enforces CORS with `FRONTEND_URL` whitelist

## Database Schema

Key tables (see `supabase/migrations/00001_initial_schema.sql`):

- `users` - User profiles with phone/email
- `listings` - Property listings with RLS policies
- `tokens` - Auth tokens with expiration
- `payments` - Razorpay payment records
- `messages` - WhatsApp message logs

**RLS Policies**:

- Listings are publicly readable, user-owned for mutations
- Users can only update their own data
- Tokens/payments have restricted access

## Common Gotchas

1. **Monorepo imports**: Always use workspace names (e.g., `@propery-connect/shared-types`), never relative paths between apps
2. **Build order**: Shared packages MUST build before apps (configured in `turbo.json`)
3. **Hot reload**: Backend uses `tsx watch`, frontend uses Next.js dev server
4. **Port conflicts**: Web runs on :3000 (or :3002 fallback), API on :3005
5. **TypeScript paths**: Backend uses `@/*` alias, frontend uses Next.js default paths

## Testing & Debugging

- Health check: `GET http://localhost:3005/api/health`
- Logs: Backend uses custom logger (`@/utils/logger`) with structured logging
- No test suite currently configured
- Database migrations: Managed via Supabase CLI (see `supabase/` directory)

## When Adding Features

1. **New API endpoint**:
   - Define Zod schema in `packages/shared-types/src/validations/`
   - Add route in `apps/api/src/routes/`
   - Implement service logic in `apps/api/src/services/`
   - Use `validate()` middleware for request validation

2. **New database table**:
   - Create migration in `supabase/migrations/`
   - Add TypeScript type in `packages/shared-types/src/database.ts`
   - Define RLS policies in migration file
   - Add table name to `TABLE_NAMES` constant

3. **Shared UI component**:
   - Add to `packages/ui/src/`
   - Export from `packages/ui/src/index.ts`
   - Use Tailwind CSS classes (config in individual apps)

4. **Documentation page**:
   - Create `.mdx` file in `apps/docs/` following the navigation structure
   - Use Mintlify components (Card, CardGroup, Accordion, CodeGroup, etc.)
   - Add page to `mint.json` navigation
   - Preview with `npm run dev --workspace=@propery-connect/docs`
