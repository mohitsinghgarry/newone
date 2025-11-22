const { Pool } = require('pg');

async function setupDatabase() {
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
    });

    try {
        const client = await pool.connect();

        console.log('Creating links table...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        total_clicks INTEGER DEFAULT 0,
        last_clicked TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Database setup complete!');
        client.release();
    } catch (error) {
        console.error('Database setup failed:', error);
    } finally {
        await pool.end();
    }
}

setupDatabase();