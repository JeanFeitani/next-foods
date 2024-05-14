import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetails from './components/product-details'
import ProductImage from '@/app/(main)/components/product-image'

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

  return (
    <div>
      <div className="xl:hidden">
        <ProductImage product={product} />
      </div>

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  )
}

export default ProductPage
