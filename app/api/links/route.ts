import { NextRequest, NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

// Initialize database on first request
let dbInitialized = false;

async function ensureDbInitialized() {
    if (!dbInitialized) {
        await initDb();
        dbInitialized = true;
    }
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function isValidCode(code: string): boolean {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
}

function generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: NextRequest) {
    try {
        await ensureDbInitialized();

        const { target_url, code: customCode } = await request.json();

        if (!target_url || !isValidUrl(target_url)) {
            return NextResponse.json(
                { error: 'Invalid URL provided' },
                { status: 400 }
            );
        }

        let code = customCode;

        if (code) {
            if (!isValidCode(code)) {
                return NextResponse.json(
                    { error: 'Code must be 6-8 characters long and contain only letters and numbers' },
                    { status: 400 }
                );
            }
        } else {
            // Generate random code
            let attempts = 0;
            do {
                code = generateRandomCode();
                attempts++;
            } while (attempts < 10);
        }

        const client = await pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *',
                [code, target_url]
            );

            return NextResponse.json(result.rows[0], { status: 201 });
        } catch (error: any) {
            if (error.code === '23505') { // Unique constraint violation
                return NextResponse.json(
                    { error: 'Code already exists' },
                    { status: 409 }
                );
            }
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error creating link:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await ensureDbInitialized();

        const client = await pool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM links ORDER BY created_at DESC'
            );

            return NextResponse.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching links:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}