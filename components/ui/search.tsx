import { useEffect, useState } from 'react'
import { Input } from './input'
import { useDebounce } from '@/hooks/use-debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './button'
import { X } from 'lucide-react'

export default function Search() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams as unknown as URLSearchParams)
  const [search, setSearch] = useState<string>(params.get('search') || '')

  const router = useRouter()

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearch === '') {
      params.delete('page')
      params.delete('search')
      router.push(`?${params.toString()}`)
      return
    }
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
      params.set('page', '1')
      router.push(`?${params.toString()}`)
      return
    }
  }, [debouncedSearch])

  return (
    <div className="relative w-full max-w-sm">
      <Input
        className="h-8"
        type="text"
        placeholder="🔎  Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {debouncedSearch && (
        <Button
          size={'icon'}
          type="button"
          onClick={() => setSearch('')}
          className="absolute right-1 top-1 h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
