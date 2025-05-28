import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Não encontrada</h1>
      <p className="mt-4 text-lg">
        A página que você está procurando não existe.
      </p>
      <Link href={'/'} className="mt-4">
        <Button className="flex gap-2 items-center">
          <span>Voltar para a página inicial</span>
          <Home />
        </Button>
      </Link>
    </div>
  )
}
