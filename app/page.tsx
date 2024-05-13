import { ChevronRightIcon } from 'lucide-react'
import { db } from './lib/prisma'
import CategoryList from './(main)/components/category-list'
import Header from './(main)/components/header'
import ProductList from './(main)/components/products-list'
import PromoBanner from './(main)/components/promo-banner'
import RestaurantList from './(main)/components/restaurant-list'
import { Button } from './(main)/components/ui/button'
import Link from 'next/link'
import Search from './(main)/components/search'
import MainBanner from './(main)/components/main-banner'

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
    <div className="m-auto flex flex-col justify-center xl:max-w-[1224px]">
      <div>
        <Header />
      </div>
      <div className="px-5 pt-6 xl:hidden ">
        <Search />
      </div>

      <div className="hidden overflow-hidden xl:block">
        <MainBanner />
      </div>

      <div className="px-5 pt-6 xl:order-1">
        <CategoryList />
      </div>
      <div className="px-5 pt-6 xl:order-3 xl:flex xl:w-[50%] xl:gap-4 xl:px-0">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
        <PromoBanner
          src="/promo-banner-02.png"
          alt="Até 30% de desconto em pizzas!"
          className="hidden h-full w-full object-contain xl:block"
        />
      </div>
      <div className="space-y-4 pt-6 xl:order-2">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold xl:text-lg">Pedidos Recomendados</h2>
          <Button
            variant={'ghost'}
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={20} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6 xl:order-3 xl:hidden">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>
      <div className="space-y-4 py-6 xl:order-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold xl:text-lg">
            Restaurantes Recomendados
          </h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </div>
  )
}

export default Home
