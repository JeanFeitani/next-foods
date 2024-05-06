import { useContext, useState } from 'react'
import { CartContext } from '../providers/context/cart-context'
import CartItem from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../lib/price'
import { Separator } from '@/app/components/ui/separator'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { createOrderAction } from '../actions/create-order-action'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

const Cart = () => {
  const { data } = useSession()
  const [inConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { products, totalPrice, totalDiscounts, subtotalPrice, clearCart } =
    useContext(CartContext)

  const handleFinishOrderClick = async () => {
    if (!data?.user) return

    const restaurant = products[0]?.restaurant

    setIsSubmitting(true)

    const order = await createOrderAction({
      subtotalPrice,
      totalDiscounts,
      totalPrice,
      deliveryFee: restaurant?.deliveryFee ?? 0,
      deliveryTimeInMinutes: restaurant?.deliveryTimeMinutes ?? 0,
      restaurant: {
        connect: { id: restaurant.id },
      },
      status: 'PENDING',
      user: {
        connect: { id: data.user.id },
      },
    })

    console.log(order)

    if (order) {
      alert('Pedido criado com sucesso!')
      clearCart()
      window.location.href = '/'
    } else {
      alert('Erro ao criar pedido, tente novamente.')
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>
            <div className="relative bottom-0 mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Desconto</span>
                    <span>{formatCurrency(Number(totalDiscounts))}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Entrega</span>
                    <span className="uppercase text-primary">
                      {Number(products[0]?.restaurant.deliveryFee) > 0
                        ? formatCurrency(
                            Number(products[0]?.restaurant.deliveryFee),
                          )
                        : 'Gratis'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              onClick={() => setConfirmDialogOpen(true)}
              className=" relative bottom-0 mt-6 w-full"
              disabled={isSubmitting}
            >
              Finalizar Pedido
            </Button>
          </>
        ) : (
          <h2>Sua sacola está vazia</h2>
        )}
      </div>

      <AlertDialog
        open={inConfirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, ele será encaminhado para o restaurante
              selecionado e não poderá ser mais alterado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={isSubmitting}
              onClick={handleFinishOrderClick}
            >
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Cart
