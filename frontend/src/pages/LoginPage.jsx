import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Zap, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Natural language product discovery',
    'Smart budget-aware recommendations',
    'Personalised to your taste & diet',
    '100+ products across 8 categories',
  ]

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0a0f0a 0%, #0d1f0d 50%, #0a0f0a 100%)' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-14 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(12,131,31,0.18) 0%, transparent 65%)' }} />
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 bg-green-gradient rounded-2xl flex items-center justify-center shadow-green">
              <Zap className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">QuickBot</h1>
              <p className="text-green-400 text-sm font-medium">AI Shopping Assistant</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
            Shop smarter,<br />not harder.
          </h2>
          <p className="text-gray-400 text-base mb-8 leading-relaxed">
            Tell our AI what you need and get instant, personalised product bundles — like Blinkit, with a brain.
          </p>
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-6 h-6 rounded-full bg-green-gradient flex items-center justify-center flex-shrink-0">
                  <Check size={13} className="text-white" />
                </div>
                <p className="text-gray-300 text-sm">{f}</p>
              </div>
            ))}
          </div>
          {/* Example queries */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              { emoji: '🎬', text: 'Movie night snacks\nunder ₹300' },
              { emoji: '💪', text: 'High-protein gym\nfood pack' },
              { emoji: '🌅', text: 'Breakfast for\n4 people' },
              { emoji: '🥗', text: 'Healthy vegan\noptions' },
            ].map((q, i) => (
              <div key={i} className="p-3 rounded-2xl text-center" style={{ background: 'rgba(12,131,31,0.1)', border: '1px solid rgba(12,131,31,0.2)' }}>
                <div className="text-2xl mb-1">{q.emoji}</div>
                <p className="text-gray-300 text-xs whitespace-pre-line leading-relaxed">{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Mobile logo */}
            <div className="flex items-center justify-center gap-2 mb-6 lg:hidden">
              <div className="w-9 h-9 bg-green-gradient rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <span className="text-xl font-bold gradient-text">QuickBot</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back!</h2>
            <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-all text-gray-900 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-11 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-all text-gray-900 text-sm"
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-green-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-all btn-press disabled:opacity-60 shadow-green text-sm mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In →'}
              </button>
            </form>

            <p className="text-center mt-5 text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 font-semibold hover:underline">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
