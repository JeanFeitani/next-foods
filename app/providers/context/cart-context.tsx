'use client'

import { calculateProductTotalPrice } from '@/app/lib/price'
import { Prisma, Product } from '@prisma/client'
import { createContext, useMemo, useState } from 'react'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: { restaurant: { select: { deliveryFee: true } } }
  }> {
  quantity: number
}

interface ICartContext {
  subtotalPrice: number
  totalPrice: number
  totalDiscounts: number
  products: CartProduct[]
  addProduct: (product: Product, quantity: number) => void
  removeProduct: (productId: string) => void
  updateProductQuantity: (productId: string, quantity: number) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProductQuantity: () => {},
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subtotalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.price) * product.quantity,
      0,
    )
  }, [products])

  const totalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) =>
        acc + calculateProductTotalPrice(product) * product.quantity,
      0,
    )
  }, [products])

  const totalDiscounts = subtotalPrice - totalPrice

  const addProduct = (product: Product, quantity: number) => {
    const isProductAlredyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    )

    if (isProductAlredyOnCart) {
      return setProducts((prevProducts) =>
        prevProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct,
        ),
      )
    }

    setProducts(
      (prevProducts) =>
        [...prevProducts, { ...product, quantity }] as CartProduct[],
    )
  }
  // A resolver a linha acima

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    )
  }

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
