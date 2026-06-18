// Simple Firestore connectivity test
const admin = require('firebase-admin');

const servicePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!servicePath) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS env var to the service account JSON path.');
  process.exit(1);
}

try {
  const sa = require(servicePath);
  admin.initializeApp({ credential: admin.credential.cert(sa) });
  const db = admin.firestore();
  (async () => {
    const ref = await db.collection('diagnostic').add({ ok: true, ts: admin.firestore.FieldValue.serverTimestamp() });
    console.log('Firestore write OK, doc id:', ref.id);
    process.exit(0);
  })();
} catch (e) {
  console.error('Firestore init/write error:', e);
  process.exit(1);
}
