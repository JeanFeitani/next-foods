import CategoryList from './components/category-list'
import Header from './components/header'
import Search from './components/search'
import ProductList from './components/products-list'
import { Button } from './components/ui/button'
import { ChevronsRightIcon } from 'lucide-react'
import { db } from './lib/prisma'
import PromoBanner from './components/promo-banner'

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: { gt: 0 },
    },
    include: { restaurant: true },
    skip: 30,
    take: 10,
  })

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>
      <div className="space-y-4 pt-6 ">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant={'ghost'}
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronsRightIcon size={20} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>
    </>
  )
}

export default Home
