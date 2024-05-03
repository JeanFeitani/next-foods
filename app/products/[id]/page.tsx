import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import ProductImage from './components/product-image'
import ProductDetails from './components/product-details'

interface ProductPageProps {
  params: {
    id: string
  }
  include: { restaurant: true }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: { id },
    include: { restaurant: true },
  })

  if (!product) {
    return notFound()
  }

  const juices = await db.product.findMany({
    where: {
      category: { name: 'Sucos' },
      restaurantId: product.restaurantId,
    },
    include: { restaurant: true },
  })

  return (
    <div>
      <ProductImage product={product} />

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  )
}

export default ProductPage
