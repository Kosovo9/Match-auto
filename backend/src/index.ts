import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { sentinelMiddleware } from './middleware/security';
import { clerkMiddleware } from '@clerk/hono';
import { createDbClient } from './db/client';
import listings from './routes/listings';
import viral from './routes/viral';

type Bindings = {
    DB: D1Database;
    REDIS: KVNamespace;
    CLERK_SECRET_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middlewares globales
app.use('*', logger());
app.use('*', cors({
    origin: [
        'http://localhost:3000',
        'https://match-auto.vercel.app',
        'https://match-auto.com',
    ],
    credentials: true,
}));

// Aplicar Middleware Sentinel X
app.use('*', sentinelMiddleware);

// Endpoint principal
app.get('/', (c) => {
    return c.json({
        message: 'Match-Auto Viral Engine API',
        status: 'operational',
        version: '2.0.0'
    })
})

// Rutas
app.route('/listings', listings);
app.route('/viral', viral);

export default app;
