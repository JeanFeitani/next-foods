'use client'

import Cart from '@/app/(main)/components/cart'
import DeliveryInfo from '@/app/(main)/components/delivery-info'
import DiscountBadge from '@/app/(main)/components/discount-badge'
import ProductList from '@/app/(main)/components/products-list'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/app/(main)/components/ui/alert-dialog'
import { Button } from '@/app/(main)/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/(main)/components/ui/sheet'
import { calculateProductTotalPrice, formatCurrency } from '@/app/lib/price'
import { CartContext } from '@/app/providers/context/cart-context'
import { Prisma } from '@prisma/client'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext, useState } from 'react'
import ProductImage from '../../../../(main)/components/product-image'
import CartBanner from '@/app/(no)/restaurants/components/cart-banner'
import { signIn, useSession } from 'next-auth/react'

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)

  const { addProductToCart, products } = useContext(CartContext)

  const { data } = useSession()
  const user = data?.user

  const addToCart = ({
    shouldResetCart = false,
  }: {
    shouldResetCart?: boolean
  }) => {
    addProductToCart({ ...product, quantity }, shouldResetCart)
    setIsCartOpen(true)
  }

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    )

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true)
    }

    addToCart({})
  }

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1)
  const handleDecreaseQuantityClick = () =>
    setQuantity((prev) => {
      if (prev === 1) return 1
      return prev - 1
    })

  return (
    <>
      <div className="m-auto xl:max-w-[1224px]">
        <div className="xl:hidden ">
          <ProductImage product={product} />
        </div>
        <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 xl:mt-1">
          <div className="max-h-[500px] xl:flex xl:gap-6 xl:px-5">
            <div className="hidden xl:block">
              <ProductImage product={product} />
            </div>
            <div
              id="conteudo"
              className="flex-1 xl:rounded-lg xl:border xl:px-5 xl:py-10"
            >
              <div className="flex items-center gap-[0.375rem] px-5">
                <div className="relative h-6 w-6 ">
                  <Image
                    src={product.restaurant.imageUrl}
                    alt={product.restaurant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.restaurant.name}
                </span>
              </div>
              <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">
                {product.name}
              </h1>
              <div className="flex justify-between px-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                      {formatCurrency(calculateProductTotalPrice(product))}
                    </h2>
                    {product.discountPercentage > 0 && (
                      <DiscountBadge product={product} />
                    )}
                  </div>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-muted-foreground">
                      De: {formatCurrency(Number(product.price))}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 text-center">
                  <Button
                    onClick={handleDecreaseQuantityClick}
                    size="icon"
                    variant="ghost"
                    className="border border-solid border-muted-foreground"
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <span className="w-4">{quantity}</span>
                  <Button onClick={handleIncreaseQuantityClick} size="icon">
                    <ChevronRightIcon />
                  </Button>
                </div>
              </div>
              <div className="mt-6 px-5">
                <DeliveryInfo restaurant={product.restaurant} />
              </div>
              <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className=" text-sm text-muted-foreground">
                  {product.description.substring(0, 250)}
                </p>
              </div>
              <div className="hidden px-5 xl:block">
                <Button
                  onClick={user ? handleAddToCartClick : () => signIn()}
                  className="mt-6 w-full font-semibold"
                >
                  Adicionar à sacola
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3 xl:px-5">
            <h3 className="px-5 font-semibold xl:px-0">Sucos</h3>
            <ProductList products={complementaryProducts} />
          </div>
          <div className="px-5">
            <Button
              onClick={user ? handleAddToCartClick : () => signIn()}
              className="mt-6 w-full font-semibold xl:hidden"
            >
              Adicionar à sacola
            </Button>
          </div>
        </div>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-[90vw]">
            <SheetHeader className="text-left">
              <SheetTitle>Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen}></Cart>
          </SheetContent>
        </Sheet>
        <AlertDialog
          open={isConfirmationDialogOpen}
          onOpenChange={setIsConfirmationDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você tem produtos de outro restaurante na sacola. Deseja
                continuar?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Se você continuar, os produtos anteriores serão removidos da
                sacola.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => addToCart({ shouldResetCart: true })}
              >
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CartBanner restaurant={product.restaurant} />
    </>
  )
}

export default ProductDetails
