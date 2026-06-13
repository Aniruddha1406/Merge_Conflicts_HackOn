import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShieldCheck, CreditCard, Banknote, Smartphone, Loader2, CheckCircle2, MapPin, ArrowLeft, Package } from 'lucide-react'
import Header from '../components/Layout/Header'
import { ordersAPI, paymentAPI } from '../services/api'
import { useCart } from '../context/CartContext'

const METHOD_ICONS = {
  cod: Banknote,
  upi: Smartphone,
  card: CreditCard,
}

export default function PaymentPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { fetchCart } = useCart()

  const [order, setOrder] = useState(null)
  const [methods, setMethods] = useState([])
  const [selectedMethod, setSelectedMethod] = useState('')
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const [orderRes, methodsRes] = await Promise.all([
          ordersAPI.get(orderId),
          paymentAPI.list(),
        ])
        if (!active) return
        setOrder(orderRes.data)
        setMethods(methodsRes.data)
        const def = methodsRes.data.find((m) => m.is_default) || methodsRes.data[0]
        if (def) setSelectedMethod(def.id)
        if (orderRes.data.payment_status === 'paid') setPaid(true)
      } catch (err) {
        setError(err.response?.data?.detail || 'Could not load order')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [orderId])

  const handlePay = async () => {
    setPaying(true)
    setError('')
    try {
      // Simulate a brief gateway processing delay
      await new Promise((r) => setTimeout(r, 1200))
      const res = await ordersAPI.pay(orderId, selectedMethod)
      setOrder(res.data)
      setPaid(true)
      await fetchCart()
    } catch (err) {
      setError(err.response?.data?.detail || 'Payment failed. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  const grandTotal = order ? order.total_amount + order.delivery_charge : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/chat')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 font-medium"
        >
          <ArrowLeft size={16} /> Back to chat
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin text-green-500" size={36} />
          </div>
        ) : error && !order ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : paid ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Successful! 🎉</h2>
            <p className="text-gray-500 mt-2">
              Your order of ₹{grandTotal.toFixed(0)} is confirmed and on its way.
            </p>
            <p className="text-xs text-gray-400 mt-1">Order ID: {order.id}</p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => navigate('/orders')}
                className="px-5 py-2.5 bg-green-gradient text-white text-sm font-semibold rounded-xl shadow-green btn-press"
              >
                View My Orders
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl btn-press"
              >
                Keep Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={22} />
              <h1 className="text-xl font-bold text-gray-900">Secure Checkout</h1>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <Package size={16} className="text-gray-400" />
                <h3 className="font-semibold text-gray-800 text-sm">Order Summary</h3>
              </div>
              <div className="p-5 space-y-3">
                {order.items.map((it) => (
                  <div key={it.product_id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {it.product_name} <span className="text-gray-400">× {it.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-900">
                      ₹{(it.price_at_purchase * it.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 space-y-1.5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{order.total_amount.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span>{order.delivery_charge > 0 ? `₹${order.delivery_charge.toFixed(0)}` : 'FREE'}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                    <span>Total</span>
                    <span className="gradient-text">₹{grandTotal.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            {order.delivery_address && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-3">
                <MapPin size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivering to</p>
                  <p className="text-sm text-gray-700 mt-1">{order.delivery_address}</p>
                </div>
              </div>
            )}

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</p>
              {methods.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No saved payment method. Using: <span className="font-medium">{order.payment_method || 'Cash on Delivery'}</span>
                </p>
              ) : (
                <div className="space-y-2">
                  {methods.map((m) => {
                    const Icon = METHOD_ICONS[m.type] || CreditCard
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMethod(m.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          selectedMethod === m.id
                            ? 'border-green-500 bg-green-50/60'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <Icon size={18} className={selectedMethod === m.id ? 'text-green-600' : 'text-gray-400'} />
                        <span className="text-sm font-medium text-gray-800">{m.label}</span>
                        {m.is_default && (
                          <span className="ml-auto text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handlePay}
              disabled={paying}
              className="w-full py-4 bg-green-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 btn-press shadow-green disabled:opacity-60"
            >
              {paying ? (
                <><Loader2 className="animate-spin" size={18} /> Processing payment...</>
              ) : (
                <>Pay ₹{grandTotal.toFixed(0)}</>
              )}
            </button>
            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> This is a demo payment portal — no real money is charged.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
