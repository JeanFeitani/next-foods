import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3 shadow-md xl:px-4"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={25}
        width={25}
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  )
}

export default CategoryItem
