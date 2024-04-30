import Image from 'next/image'
import CategoryList from './components/category-list'
import Header from './components/header'
import Search from './components/search'
import ProductList from './components/products-list'
import { Button } from './components/ui/button'
import { ChevronsRightIcon } from 'lucide-react'

const Home = () => {
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto"
          width={500}
          height={500}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
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
        <ProductList />
      </div>
    </>
  )
}

export default Home
