const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Init Firebase Admin
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  admin.initializeApp(); // SDK will pick up GOOGLE_APPLICATION_CREDENTIALS path
} else {
  console.error('No Firebase credentials provided. Set GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_APPLICATION_CREDENTIALS_JSON');
  process.exit(1);
}

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, customerName, note } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items required' });
    }
    const total = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
    const docRef = await db.collection('orders').add({
      items,
      customerName: customerName || null,
      note: note || null,
      total,
      status: 'Received',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return res.json({ id: docRef.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Update status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['Received', 'In Progress', 'Ready'];
    if (!allowed.includes(status)) return res.status(400).json({ error: 'invalid status' });
    const ref = db.collection('orders').doc(id);
    await ref.update({ status });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
