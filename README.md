# Cooking Website

A rogue-lite cooking game plus the site around it.

- `server/` Express + MongoDB + JWT, written in TypeScript
- `client/` Vite + React + TypeScript + Tailwind + shadcn (see `client/README.md`)

## Run the server
```bash
cd server
npm install
cp .env.example .env    # fill in MONGO_URI and JWT_SECRET
npm run dev
```

## API
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET  | /api/health            | no  | Health check |
| POST | /api/auth/register     | no  | `{ name, email, password }` |
| POST | /api/auth/login        | no  | `{ email, password }` |
| GET  | /api/users/me          | yes | Current user |
| GET  | /api/game/ingredients  | no  | All ingredients (flavors, cost, tags, substitutes) |
| GET  | /api/game/challenges   | no  | All challenges |
| GET  | /api/game/progress     | yes | Coins, unlocked ingredients, best score |
| POST | /api/game/runs         | yes | `{ score }` when a run ends, server awards coins |
| POST | /api/game/unlock       | yes | `{ ingredientId }` spend coins to unlock |

Auth header: `Authorization: Bearer <token>`

## Game design in code
- `server/src/game/ingredients.ts`: every ingredient, its flavor effects, cost, health tags and substitutes
- `server/src/game/challenges.ts`: what a meal needs (flavors) and what is banned (tags)
- The database only stores a player's coins and a list of unlocked ingredient ids.
