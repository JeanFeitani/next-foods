'use client'

import { Button } from '@/app/(main)/components/ui/button'
import { Product } from '@prisma/client'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <div className="relative h-[360px] w-full xl:h-[500px] xl:w-[600px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="object-cover xl:rounded-md"
        fill
        quality={100}
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white xl:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  )
}

export default ProductImage
