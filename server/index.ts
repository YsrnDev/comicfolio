import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './auth';
import { db } from './db';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const app = new Hono();

// CORS is critical for client-server communication
app.use('/api/*', cors({
    origin: [
        'http://localhost:4173',
        'http://localhost:3000',
        'http://192.168.100.50:4173',
        'http://192.168.100.50:3000',
        'http://10.5.1.25:3000',
        'https://portfolio.ysrn.xyz',
        'http://portfolio.ysrn.xyz'
    ],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH', 'PUT'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}));

// Mount Better Auth handler
app.all("/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
});

// --- API ROUTES ---

// PROJECTS
app.get('/api/projects', (c) => {
    const projects = db.prepare('SELECT * FROM projects').all();
    // Parse tags JSON
    const parsedProjects = projects.map((p: any) => ({
        ...p,
        tags: JSON.parse(p.tags)
    }));
    return c.json(parsedProjects);
});

app.post('/api/projects', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    const { title, description, tags, imageUrl, link } = body;

    const info = db.prepare(`
        INSERT INTO projects (title, description, tags, imageUrl, link)
        VALUES (@title, @description, @tags, @imageUrl, @link)
    `).run({
        title,
        description,
        tags: JSON.stringify(tags),
        imageUrl,
        link
    });

    return c.json({ id: info.lastInsertRowid, ...body });
});

app.put('/api/projects/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const body = await c.req.json();
    const { title, description, tags, imageUrl, link } = body;

    db.prepare(`
        UPDATE projects 
        SET title = @title, description = @description, tags = @tags, imageUrl = @imageUrl, link = @link
        WHERE id = @id
    `).run({
        id,
        title,
        description,
        tags: JSON.stringify(tags),
        imageUrl,
        link
    });

    return c.json({ success: true });
});

app.delete('/api/projects/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    return c.json({ success: true });
});

// EXPERIENCES
app.get('/api/experiences', (c) => {
    const experiences = db.prepare('SELECT * FROM experiences').all();
    return c.json(experiences);
});

app.post('/api/experiences', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    db.prepare(`
        INSERT INTO experiences (role, company, period, description, side)
        VALUES (@role, @company, @period, @description, @side)
    `).run(body);

    return c.json({ success: true });
});

app.put('/api/experiences/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const body = await c.req.json();

    db.prepare(`
        UPDATE experiences
        SET role = @role, company = @company, period = @period, description = @description, side = @side
        WHERE id = @id
    `).run({ ...body, id });

    return c.json({ success: true });
});

// MESSAGES
app.get('/api/messages', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const messages = db.prepare('SELECT * FROM messages ORDER BY timestamp DESC').all();
    // Convert 1/0 to boolean for read status
    const parsed = messages.map((m: any) => ({
        ...m,
        read: Boolean(m.read)
    }));
    return c.json(parsed);
});

app.post('/api/messages', async (c) => {
    const body = await c.req.json();
    const { codename, email, content } = body;
    const id = randomUUID();
    const timestamp = Date.now();

    db.prepare(`
        INSERT INTO messages (id, codename, email, content, timestamp, read)
        VALUES (@id, @codename, @email, @content, @timestamp, 0)
    `).run({ id, codename, email, content, timestamp });

    return c.json({ success: true, id, timestamp });
});

app.patch('/api/messages/:id/read', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    db.prepare('UPDATE messages SET read = 1 WHERE id = ?').run(id);
    return c.json({ success: true });
});

// SKILLS
app.get('/api/skills', (c) => {
    const skills = db.prepare('SELECT * FROM skills').all();
    return c.json(skills);
});

app.post('/api/skills', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    const info = db.prepare(`
        INSERT INTO skills (name, level, color)
        VALUES (@name, @level, @color)
    `).run(body);

    return c.json({ id: info.lastInsertRowid, ...body });
});

app.put('/api/skills/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const body = await c.req.json();
    db.prepare(`
        UPDATE skills SET name = @name, level = @level, color = @color WHERE id = @id
    `).run({ ...body, id });

    return c.json({ success: true });
});

app.delete('/api/skills/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    db.prepare('DELETE FROM skills WHERE id = ?').run(id);
    return c.json({ success: true });
});


// GADGETS
app.get('/api/gadgets', (c) => {
    const gadgets = db.prepare('SELECT * FROM gadgets').all();
    return c.json(gadgets);
});

app.post('/api/gadgets', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    // Use ID provided by client (from constants) or generate new? 
    // Constants used string IDs. Let's assume client sends ID or we generate one.
    // If client sends ID, use it. If not, random.
    const id = body.id || randomUUID();

    db.prepare(`
        INSERT INTO gadgets (id, name, icon, description)
        VALUES (@id, @name, @icon, @description)
    `).run({ ...body, id });

    return c.json({ id, ...body });
});

app.put('/api/gadgets/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const body = await c.req.json();
    db.prepare(`
        UPDATE gadgets SET name = @name, icon = @icon, description = @description WHERE id = @id
    `).run({ ...body, id });

    return c.json({ success: true });
});

app.delete('/api/gadgets/:id', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    db.prepare('DELETE FROM gadgets WHERE id = ?').run(id);
    return c.json({ success: true });
});

app.get('/', (c) => {
    return c.text('Comicfolio Auth Server is running!');
});

const port = 4000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
    hostname: '0.0.0.0'
});
