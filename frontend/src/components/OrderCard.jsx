import React from 'react'
export default function OrderCard({ order, onUpdate }) {
  return (
    <div className="order-card">
      <div><strong>#{order.id}</strong> - {order.customerName || 'Guest'}</div>
      <div>{order.items && order.items.map((it,i)=> <div key={i}>{it.name} x {it.quantity}</div>)}</div>
      <div>Status: {order.status}</div>
      <div>
        <button onClick={() => onUpdate(order.id, 'Received')}>Received</button>
        <button onClick={() => onUpdate(order.id, 'In Progress')}>In Progress</button>
        <button onClick={() => onUpdate(order.id, 'Ready')}>Ready</button>
      </div>
    </div>
  )
}
