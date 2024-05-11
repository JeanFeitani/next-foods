import { formatCurrency, calculateProductTotalPrice } from '@/app/lib/price'
import { CartProduct, CartContext } from '@/app/providers/context/cart-context'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'
import { useContext } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { removeProduct, updateProductQuantity } = useContext(CartContext)

  const handleIncreaseProductQuantity = () => {
    updateProductQuantity(cartProduct.id, cartProduct.quantity + 1)
  }

  const handleDecreaseProductQuantity = () => {
    updateProductQuantity(cartProduct.id, cartProduct.quantity - 1)
  }

  return (
    <div className="justify-betweeen flex gap-4">
      <div className="relative h-20 w-20">
        <Image
          fill
          quality={100}
          src={cartProduct.imageUrl}
          alt={cartProduct.name}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="space-y-1 ">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <h4 className="inline text-sm font-semibold">
            {formatCurrency(
              calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
            )}
          </h4>
          {cartProduct.discountPercentage > 0 && (
            <span className="ml-1 text-xs text-muted-foreground line-through">
              {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
            </span>
          )}
          <div className="flex items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-muted-foreground "
              onClick={handleDecreaseProductQuantity}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="w-8 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseProductQuantity}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>

        <Button
          size="icon"
          className="h-8 w-8 border border-solid border-muted-foreground"
          variant="ghost"
          onClick={() => removeProduct(cartProduct.id)}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    </div>
  )
}

export default CartItem
