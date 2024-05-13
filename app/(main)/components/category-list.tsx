import { db } from '@/app/lib/prisma'
import CategoryItem from './category-item'

const CategoryList = async () => {
  const categories = await db.category.findMany({ take: 6 })

  return (
    <div className="grid grid-cols-2 gap-3 xl:flex">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id}></CategoryItem>
      ))}
    </div>
  )
}

export default CategoryList
