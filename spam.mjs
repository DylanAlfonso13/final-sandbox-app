// spam.mjs
import fetch from 'node-fetch';

const targetURL = 'https://final-sandbox-app.vercel.app/api/rsvp';

async function submitRSVP(index) {
  const res = await fetch(targetURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Test User ${index}`,
      email: `user${index}@example.com`,
      note: `Automated RSVP #${index}`
    })
  });

  const result = await res.json();
  console.log(`RSVP ${index}:`, res.status, result);
}

const NUM_REQUESTS = 200;

for (let i = 1; i <= NUM_REQUESTS; i++) {
  submitRSVP(i);
}
