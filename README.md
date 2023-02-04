# NUXT 3 Simple event scheduler

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

Make sure to create a `.env` file with the following content (or use the `.env.example` file):

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET=secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
BASE_URL=http://localhost:3000
EMAIL_DOMAIN=@itismeucci.com
DATABASE_URL=postgress_url
SHADOW_DATABASE_URL=postgress_url/postgres_shadow
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
