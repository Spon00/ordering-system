import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function OrderStatus() {
  const [id, setId] = useState('')
  const [order, setOrder] = useState(null)
  const watch = () => {
    if (!id) return alert('Enter order id')
    const ref = doc(db, 'orders', id)
    const unsub = onSnapshot(ref, snap => {
      if (!snap.exists()) {
        setOrder({ notFound: true })
      } else {
        setOrder({ id: snap.id, ...snap.data() })
      }
    })
    return unsub
  }

  useEffect(() => {
    // nothing
  }, [])

  return (
    <div>
      <h2>Track Order</h2>
      <input placeholder="Enter order number" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={watch}>Track</button>
      {order && order.notFound && <p>Order not found</p>}
      {order && !order.notFound && (
        <div>
          <p>Order #{order.id}</p>
          <p>Status: <strong>{order.status}</strong></p>
          {order.items && order.items.map((it,i) => <div key={i}>{it.name} x {it.quantity}</div>)}
        </div>
      )}
    </div>
  )
}
