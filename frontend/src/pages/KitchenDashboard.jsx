import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt','desc'))
    const unsub = onSnapshot(q, snap => {
      const arr = []
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }))
      setOrders(arr)
    })
    return () => unsub()
  }, [])

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
  }

  return (
    <div>
      <h2>Kitchen Dashboard</h2>
      {orders.length === 0 && <p>No orders yet</p>}
      <div className="orders-grid">
        {orders.map(o => (
          <div key={o.id} className="order-card">
            <div className="order-header">
              <strong>#{o.id}</strong>
              <span>{o.customerName || 'Guest'}</span>
            </div>
            <div>
              {o.items && o.items.map((it, i) => <div key={i}>{it.name} x {it.quantity}</div>)}
            </div>
            <div>Total: ${o.total}</div>
            <div>Status: <strong>{o.status}</strong></div>
            <div className="status-buttons">
              <button onClick={() => updateStatus(o.id, 'Received')}>Received</button>
              <button onClick={() => updateStatus(o.id, 'In Progress')}>In Progress</button>
              <button onClick={() => updateStatus(o.id, 'Ready')}>Ready</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
