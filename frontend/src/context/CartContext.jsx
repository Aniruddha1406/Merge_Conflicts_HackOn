import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartAPI } from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [isOpen, setIsOpen] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user) return
    try {
      const res = await cartAPI.get()
      setCart(res.data)
    } catch {}
  }, [user])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addToCart = async (product_id, quantity = 1) => {
    await cartAPI.add(product_id, quantity)
    await fetchCart()
    setIsOpen(true)
  }

  const removeFromCart = async (product_id) => {
    await cartAPI.remove(product_id)
    await fetchCart()
  }

  const updateQuantity = async (product_id, quantity) => {
    await cartAPI.update(product_id, quantity)
    await fetchCart()
  }

  const clearCart = async () => {
    await cartAPI.clear()
    setCart({ items: [], total: 0 })
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart, isOpen, setIsOpen,
      addToCart, removeFromCart, updateQuantity, clearCart,
      fetchCart, itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
