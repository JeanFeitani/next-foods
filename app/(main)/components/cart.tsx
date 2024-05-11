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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createOrderAction } from '@/app/actions/create-order-action'
import { formatCurrency } from '@/app/lib/price'
import { CartContext } from '@/app/providers/context/cart-context'
import { Separator } from '@radix-ui/react-separator'
import { useSession } from 'next-auth/react'
import { useState, useContext } from 'react'
import CartItem from './cart-item'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface CartProps {
  setIsOpen: (open: boolean) => void
}

const Cart = ({ setIsOpen }: CartProps) => {
  const { data } = useSession()
  const [inConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const { products, totalPrice, totalDiscounts, subtotalPrice, clearCart } =
    useContext(CartContext)

  const handleFinishOrderClick = async () => {
    if (!data?.user) return

    const restaurant = products[0]?.restaurant

    try {
      setIsSubmitting(true)

      await createOrderAction({
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
        orderProducts: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      })
      clearCart()

      setIsOpen(false)

      toast('Pedido Finalizado', {
        description: 'Você pode acompanhà-lo na tela dos seus pedidos',
        action: {
          label: 'Meus Pedidos',
          onClick: () => router.push('/my-orders'),
        },
      })
    } catch (e) {
      toast.error('Erro ao Finalizar Pedido', {
        description: 'Algo deu errado ao tentar fazer o seu pedido',
      })
    } finally {
      setIsSubmitting(false)
    }
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
                        : 'Grátis'}
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
          <h2>Sua sacola esta vazia</h2>
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
