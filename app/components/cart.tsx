import { useContext } from 'react'
import { CartContext } from '../providers/context/cart-context'
import CartItem from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../lib/price'

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
          <CardContent>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Desconto</span>
                <span>-{formatCurrency(Number(totalDiscounts))}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Entrega</span>
                <span>
                  {Number(products[0].restaurant.deliveryFee) > 0
                    ? formatCurrency(Number(products[0].restaurant.deliveryFee))
                    : 'Gratis'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cart
