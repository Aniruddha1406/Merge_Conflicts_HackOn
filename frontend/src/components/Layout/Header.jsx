import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, MessageSquare, Package, LogOut, Zap, User as UserIcon, ClipboardList, CalendarDays, Users, ChevronDown, MapPin, CreditCard, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const NAV = [
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/meal-plan', label: 'Meal Plan', icon: CalendarDays },
  { path: '/group', label: 'Group', icon: Users },
  { path: '/orders', label: 'Orders', icon: ClipboardList },
  { path: '/account', label: 'Account', icon: UserIcon },
]

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount, setIsOpen } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  // close dropdown on outside click / route change
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const go = (path) => { setMenuOpen(false); navigate(path) }

  const MENU = [
    { label: 'Your Account', desc: 'Profile, addresses & payment', icon: UserIcon, path: '/account' },
    { label: 'Your Orders', desc: 'Track & view past orders', icon: ClipboardList, path: '/orders' },
    { label: 'Saved Addresses', desc: 'Manage delivery locations', icon: MapPin, path: '/account' },
    { label: 'Payment Methods', desc: 'Cards, UPI & more', icon: CreditCard, path: '/account' },
    { label: 'Meal Plans', desc: 'Your weekly meal plans', icon: CalendarDays, path: '/meal-plan' },
    { label: 'Group Carts', desc: 'Shop with friends', icon: Users, path: '/group' },
  ]

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full glass border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/chat" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="hidden sm:block leading-tight">
            <span className="text-xl font-bold gradient-text font-display tracking-tight">Amazon Now</span>
            <p className="text-[10px] text-gray-500 -mt-1 tracking-[0.18em] uppercase font-semibold">Shopping Reimagined</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5 glass-panel rounded-xl p-1">
          {NAV.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || location.pathname.startsWith(path + '/')
            return (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${active
                    ? 'bg-green-gradient text-white shadow-green'
                    : 'text-gray-600 hover:bg-white/70 hover:text-gray-900'
                  }`}
              >
                <Icon size={16} />
                <span className="hidden lg:block">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="cart-toggle"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-white/70 hover:bg-white text-green-700 rounded-xl font-bold text-sm transition-all btn-press lift border border-white/70"
          >
            <ShoppingCart size={17} />
            <span className="hidden sm:block">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-gold-gradient rounded-full text-white text-xs flex items-center justify-center font-bold shadow-glow-gold animate-bounce-subtle">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* User dropdown (Amazon-style) */}
          <div ref={menuRef} className="relative pl-2 border-l border-white/50">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 py-1 pl-1 pr-2 rounded-xl hover:bg-white/60 transition-colors btn-press"
            >
              <div className="w-9 h-9 bg-green-gradient rounded-full flex items-center justify-center text-white text-sm font-bold select-none shadow-green ring-2 ring-white/60">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block text-left leading-tight">
                <p className="text-[10px] text-gray-500 -mb-0.5">Hello,</p>
                <span className="text-sm font-bold text-gray-800 max-w-[110px] truncate flex items-center gap-1">
                  {user?.username}
                  <ChevronDown size={13} className={`text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 glass rounded-2xl shadow-card-hover overflow-hidden animate-slide-up origin-top-right z-50">
                {/* Account header */}
                <div className="px-4 py-3.5 bg-green-gradient text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-lg font-bold ring-2 ring-white/40">
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{user?.username}</p>
                      <p className="text-[11px] text-white/80 truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  {MENU.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => go(item.path)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/70 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-700 flex-shrink-0">
                        <item.icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-tight">{item.label}</p>
                        <p className="text-[11px] text-gray-400 truncate">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Sign out */}
                <div className="border-t border-white/50 p-1.5">
                  <button
                    id="logout-btn"
                    onClick={() => { setMenuOpen(false); logout() }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold text-sm"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
