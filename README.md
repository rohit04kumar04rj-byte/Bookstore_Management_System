# Bookstore Management System

A full-stack bookstore management app with a React client and an Express/MongoDB backend.

## Project Structure

- `bookstore-app/client` - Vite + React frontend
- `bookstore-app/server` - Express API with MongoDB
- `scripts/dev.js` - helper script to run the client and server together

## Getting Started

1. Install dependencies:

```bash
npm install
npm --prefix bookstore-app/client install
npm --prefix bookstore-app/server install
```

2. Create a local env file:

```bash
cp .env.example .env
```

3. Start the app:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - start client and server together
- `npm run dev:client` - start the frontend only
- `npm run dev:server` - start the backend only
- `npm run build` - build the frontend
