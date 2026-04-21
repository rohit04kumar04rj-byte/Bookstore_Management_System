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

## Deploy On Vercel

1. Import this GitHub repository into Vercel.
2. Keep the project root as the repository root.
3. Add these environment variables in Vercel:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
VITE_API_URL=/api
```

4. Deploy the project.

The frontend is built from `bookstore-app/client`, and the backend is exposed as a Vercel Function through [`api/index.js`](/Users/rohitkumar/Desktop/Bookstore_Management_System/api/index.js).
