// Simple test script to verify API endpoints
// Run with: node test-api.js

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function testAPI() {
    console.log('Testing TinyLink API...\n');

    try {
        // Test health check
        console.log('1. Testing health check...');
        const healthResponse = await fetch(`${BASE_URL}/healthz`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);

        // Test creating a link
        console.log('\n2. Testing link creation...');
        const createResponse = await fetch(`${BASE_URL}/api/links`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target_url: 'https://example.com',
                code: 'test123'
            })
        });

        if (createResponse.ok) {
            const linkData = await createResponse.json();
            console.log('✅ Link created:', linkData);

            // Test getting the link
            console.log('\n3. Testing link retrieval...');
            const getResponse = await fetch(`${BASE_URL}/api/links/${linkData.code}`);
            const getData = await getResponse.json();
            console.log('✅ Link retrieved:', getData);

        } else {
            const error = await createResponse.json();
            console.log('❌ Link creation failed:', error);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    testAPI();
}