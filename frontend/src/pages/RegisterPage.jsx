import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true)
    try {
      await register(form.username, form.email, form.password)
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({ id, label, type = 'text', icon: Icon, value, onChange, placeholder, rightEl }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
        <input
          id={id} type={type} required value={value} onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-all text-gray-900 text-sm"
          placeholder={placeholder}
        />
        {rightEl}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #0a0f0a 0%, #0d1f0d 50%, #0a0f0a 100%)' }}>
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-gradient rounded-xl flex items-center justify-center shadow-green">
              <Zap size={20} className="text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold gradient-text">QuickBot</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Start your AI shopping journey — free</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField id="reg-username" label="Username" icon={User}
              value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="johndoe" />

            <InputField id="reg-email" label="Email" type="email" icon={Mail}
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com" />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  id="reg-password" type={showPw ? 'text' : 'password'} required
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-11 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-all text-gray-900 text-sm"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <InputField id="reg-confirm" label="Confirm Password" type="password" icon={Lock}
              value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Repeat your password" />

            <button
              id="reg-submit" type="submit" disabled={loading}
              className="w-full py-3.5 bg-green-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-all btn-press disabled:opacity-60 shadow-green text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account...
                </span>
              ) : 'Create Account →'}
            </button>
          </form>

          <p className="text-center mt-5 text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
