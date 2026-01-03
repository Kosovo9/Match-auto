import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { ListingsService, SearchFilters } from '../services/listings.service';

const app = new Hono();

const createListingSchema = z.object({
    title: z.string().min(5).max(200),
    description: z.string().max(5000).optional(),
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    price: z.number().min(0),
    mileage: z.number().min(0).optional(),
    fuelType: z.enum(['gasoline', 'diesel', 'electric', 'hybrid', 'other']).optional(),
    transmission: z.enum(['manual', 'automatic']).optional(),
    images: z.array(z.string().url()).max(10).optional(),
    locationLat: z.number().min(-90).max(90).optional(),
    locationLng: z.number().min(-180).max(180).optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
});

app.get('/:id', async (c) => {
    // ...
    return c.json({ success: true, data: {} });
});

export default app;
