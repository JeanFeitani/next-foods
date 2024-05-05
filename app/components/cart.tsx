import { useContext } from 'react'
import { CartContext } from '../providers/context/cart-context'
import CartItem from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../lib/price'
import { Separator } from '@/app/components/ui/separator'
import { Button } from './ui/button'

const Cart = () => {
  const { products, totalPrice, totalDiscounts, subtotalPrice } =
    useContext(CartContext)

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="mt-6">
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
              <span className="uppercase text-primary ">
                {Number(products[0]?.restaurant.deliveryFee) > 0
                  ? formatCurrency(Number(products[0]?.restaurant.deliveryFee))
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

      <Button className="mt-6 w-full">Finalizar Pedido</Button>
    </div>
  )
}

export default Cart
