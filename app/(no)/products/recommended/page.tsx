import ProductItem from '@/app/(main)/components/product-item'
import { db } from '@/app/lib/prisma'

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="xl:m-auto xl:max-w-[1224px]">
      <div className="px-5 py-6 xl:mt-4">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-6  xl:gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecommendedProductsPage
