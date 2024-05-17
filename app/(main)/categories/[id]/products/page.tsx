import ProductItem from '@/app/(main)/components/product-item'
import RestaurantList from '@/app/(main)/components/restaurant-list'
import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'

interface CategoriesPageProps {
  params: {
    id: string
  }
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!category) {
    return notFound()
  }

  return (
    <div className="py-6">
      <div className="px-5 ">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6 xl:max-h-[550px] xl:grid-cols-6 xl:gap-4 xl:overflow-hidden">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-6 px-5 text-lg font-semibold">Restarantes</h2>
        <RestaurantList />
      </div>
    </div>
  )
}

export default CategoriesPage
