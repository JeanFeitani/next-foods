import Image from 'next/image'
import Search from './search'

const MainBanner = () => {
  return (
    <div className="h-[500px]">
      <div className="absolute left-[0] z-[-1] h-[500px] w-[100vw] bg-red-600" />
      <div className="relative flex h-full flex-col justify-center">
        <h1 className="mb-2.5 text-5xl font-bold text-white">Está com fome?</h1>
        <p className="mb-6 text-lg text-white">
          Com apenas alguns cliques, encontre refeições acessíveis perto de
          você.
        </p>

        <div className="w-[51%] rounded-md bg-white p-5">
          <Search yellow />
        </div>

        <div className="absolute -bottom-0 right-0 brightness-150">
          <Image
            src="/image.png"
            alt="Banner"
            width={377}
            height={377}
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

export default MainBanner
