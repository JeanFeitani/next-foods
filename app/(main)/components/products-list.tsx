import { Prisma } from '@prisma/client'
import ProductItem from './product-item'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
  soft?: boolean
}
const ProductList = ({ products, soft }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 xl:gap-5 xl:px-0 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} soft={soft} />
      ))}
    </div>
  )
}

export default ProductList
