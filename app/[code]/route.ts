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
            // Get the link and increment click count
            const result = await client.query(
                `UPDATE links 
         SET total_clicks = total_clicks + 1, last_clicked = CURRENT_TIMESTAMP 
         WHERE code = $1 
         RETURNING target_url`,
                [code]
            );

            if (result.rows.length === 0) {
                return new NextResponse('Not Found', { status: 404 });
            }

            const targetUrl = result.rows[0].target_url;

            return NextResponse.redirect(targetUrl, 302);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error redirecting:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}