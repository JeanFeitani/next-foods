import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import RestaurantImage from '../components/restaurant-image'
import DeliveryInfo from '../../../(main)/components/delivery-info'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import RestaurantDetails from '../components/restaurant-details'
import CartBanner from '../components/cart-banner'

interface RestaurantsPageProps {
  params: {
    id: string
  }
}

const RestaurantsPage = async ({ params: { id } }: RestaurantsPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  if (!restaurant) {
    return notFound()
  }

  return (
    <div>
      <div className="m-auto xl:max-w-[1224px]">
        <div className="gap-8 xl:mt-6 xl:flex xl:px-5">
          <div className="flex-1">
            <RestaurantImage restaurant={restaurant} />
          </div>

          <div className="hidden flex-1 xl:block">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8 ">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>
              <div className="left-2 top-2 flex items-center gap-[3px] rounded-full bg-foreground px-3 py-[4px] text-white ">
                <StarIcon
                  size={16}
                  className=" fill-yellow-400  text-yellow-400"
                />
                <span className="text-sm font-semibold">5.0</span>
              </div>
            </div>

            <DeliveryInfo restaurant={restaurant} />

            <div className="overflow-x-scroll[&::-webkit-scrollbar]:hidden mt-3 flex gap-4">
              {restaurant.categories.map((category) => (
                <div
                  className="w-full flex-1 rounded-lg bg-[#F4F4F4] text-center"
                  key={category.id}
                >
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 ">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                O SushiDojo é uma joia gastronômica que transporta seus clientes
                para o coração do Japão, com sua atmosfera serena, design
                minimalista e um balcão de sushi onde mestres habilidosos
                preparam pratos autênticos com ingredientes frescos e
                selecionados, garantindo uma experiência culinária excepcional e
                memorável.
              </p>
            </div>
          </div>
        </div>

        <RestaurantDetails restaurant={restaurant} />
      </div>
      <CartBanner restaurant={restaurant} />
    </div>
  )
}

export default RestaurantsPage
