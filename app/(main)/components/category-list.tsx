import { db } from '@/app/lib/prisma'
import CategoryItem from './category-item'

const CategoryList = async () => {
  const categories = await db.category.findMany({ take: 6 })

  return (
    <div className="flex gap-3">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  )
}

export default CategoryList
