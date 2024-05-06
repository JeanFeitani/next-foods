'use client'

import { calculateProductTotalPrice } from '@/app/lib/price'
import { Prisma } from '@prisma/client'
import { createContext, useMemo, useState } from 'react'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { deliveryFee: true; id: true; deliveryTimeMinutes: true }
      }
    }
  }> {
  quantity: number
}

interface ICartContext {
  subtotalPrice: number
  totalPrice: number
  totalDiscounts: number
  totalQuantity: number
  products: CartProduct[]
  addProduct: (product: CartProduct, resetCart: boolean) => void
  removeProduct: (productId: string) => void
  updateProductQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProductQuantity: () => {},
  clearCart: () => {},
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const clearCart = () => {
    setProducts([])
  }

  const totalQuantity = useMemo(
    () =>
      products.reduce((acc, product) => {
        return acc + product.quantity
      }, 0),
    [products],
  )

  const subtotalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0,
    )
  }, [products])

  const totalPrice = useMemo(() => {
    return (
      products.reduce(
        (acc, product) =>
          acc + calculateProductTotalPrice(product) * product.quantity,
        0,
      ) + Number(products[0]?.restaurant.deliveryFee)
    )
  }, [products])

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products[0]?.restaurant.deliveryFee)

  const addProduct = (product: CartProduct, shouldClearCart: boolean) => {
    if (shouldClearCart) {
      clearCart()
    }

    const isProductAlredyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    )

    if (isProductAlredyOnCart) {
      return setProducts((prevProducts) =>
        prevProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? {
                ...cartProduct,
                quantity: cartProduct.quantity + product.quantity,
              }
            : cartProduct,
        ),
      )
    }

    setProducts((prevProducts) => [...prevProducts, { ...product }])
  }

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    )
  }

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity < 1 || quantity > 99) {
      return
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product,
      ),
    )
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateProductQuantity,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
