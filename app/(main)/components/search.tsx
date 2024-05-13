'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchProps {
  yellow?: boolean
}

const Search = ({ yellow }: SearchProps) => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!search) {
      return
    }

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form className="flex gap-3" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button
        size="icon"
        type="submit"
        className={`${yellow && 'bg-yellow-400'}`}
      >
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}

export default Search
