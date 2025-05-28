import { Button } from '@/components/ui/button'
import Search from '@/components/ui/search'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function SearchToolbar({ link }: { link: string }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4  items-end lg:items-center justify-between mb-4">
      <Search />
      <Link href={link}>
        <Button size={'sm'} className="flex gap-2">
          <span>Cadastrar novo</span>
          <Plus />
        </Button>
      </Link>
    </div>
  )
}
