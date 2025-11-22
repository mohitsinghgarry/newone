import { NextRequest, NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

let dbInitialized = false;

async function ensureDbInitialized() {
    if (!dbInitialized) {
        await initDb();
        dbInitialized = true;
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        await ensureDbInitialized();

        const { code } = params;

        const client = await pool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM links WHERE code = $1',
                [code]
            );

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Link not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(result.rows[0]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching link:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        await ensureDbInitialized();

        const { code } = params;

        const client = await pool.connect();
        try {
            const result = await client.query(
                'DELETE FROM links WHERE code = $1 RETURNING *',
                [code]
            );

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Link not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error deleting link:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}