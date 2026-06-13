import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Loader2, Clock, CheckCircle2, CreditCard } from 'lucide-react'
import Header from '../components/Layout/Header'
import { ordersAPI } from '../services/api'

export default function OrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersAPI.list()
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-500" size={32} /></div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <Package size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No orders yet</p>
            <button onClick={() => navigate('/chat')} className="mt-4 px-5 py-2.5 bg-green-gradient text-white text-sm font-semibold rounded-xl shadow-green btn-press">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const grand = o.total_amount + o.delivery_charge
              const isPaid = o.payment_status === 'paid'
              return (
                <div key={o.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Order #{o.id.slice(0, 8)}</p>
                      <p className="font-bold text-gray-900 mt-0.5">₹{grand.toFixed(0)}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isPaid ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {isPaid ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {isPaid ? 'Paid' : 'Pending payment'}
                    </span>
                  </div>
                  <div className="space-y-1 border-t border-gray-100 pt-3">
                    {o.items.map((it) => (
                      <div key={it.product_id} className="flex justify-between text-sm text-gray-600">
                        <span>{it.product_name} × {it.quantity}</span>
                        <span>₹{(it.price_at_purchase * it.quantity).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                  {o.delivery_address && <p className="text-xs text-gray-400 mt-3">🚚 {o.delivery_address}</p>}
                  {!isPaid && (
                    <button
                      onClick={() => navigate(`/payment/${o.id}`)}
                      className="mt-3 w-full py-2.5 bg-green-gradient text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 btn-press shadow-green"
                    >
                      <CreditCard size={15} /> Complete Payment
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
