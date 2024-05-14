import { BikeIcon, TimerIcon } from 'lucide-react'
import { Restaurant } from '@prisma/client'
import { formatCurrency } from '@/app/lib/price'
import { Card } from './ui/card'

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="flex justify-around rounded-3xl py-3 xl:flex-auto">
      <div className="text-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <strong className="text-sm font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </strong>
        ) : (
          <strong className="text-sm font-semibold">Grátis</strong>
        )}
      </div>
      <div className="text-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Entrega</span>
          <TimerIcon size={14} />
        </div>
        <strong className="text-sm font-semibold">
          {Number(restaurant.deliveryTimeMinutes)} min
        </strong>
      </div>
    </Card>
  )
}

export default DeliveryInfo
