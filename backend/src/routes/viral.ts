import { Hono } from 'hono';

const app = new Hono();

app.get('/metrics', async (c) => {
    return c.json({ success: true, data: {} });
});

export default app;
