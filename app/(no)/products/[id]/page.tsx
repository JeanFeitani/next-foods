import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetails from './components/product-details'

interface ProductPageProps {
  params: {
    id: string
  }
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

  return <ProductDetails product={product} complementaryProducts={juices} />
}

export default ProductPage
