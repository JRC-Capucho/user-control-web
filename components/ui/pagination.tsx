import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { handlePaginate } from '@/lib/utils'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  multiple?: number
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  multiple = 10,
}: PaginationProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pages = Math.ceil(totalCount / perPage) || 1
  const [itemsPerPage, setItemsPerPage] = useState(String(perPage))

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value)
    handlePaginate(
      1,
      { ...(Object.fromEntries(searchParams) as any), perPage: value },
      router,
    )
  }

  return (
    <div className="flex w-full flex-col-reverse gap-6 py-4 sm:flex-row md:items-center md:justify-between">
      <span className="text-center text-sm text-muted-foreground sm:text-start">
        Total de {totalCount} item(s)
      </span>

      <div className="flex flex-col-reverse gap-6 sm:flex-row md:items-center md:space-x-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row md:gap-8">
          <span className="text-sm font-medium">Itens por página</span>

          <Select
            defaultValue={itemsPerPage}
            value={itemsPerPage}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="h-8 w-24 md:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <SelectItem key={index} value={String((index + 1) * multiple)}>
                  {(index + 1) * multiple}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <span className="text-sm font-medium">
            Página {pageIndex} de {pages}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePaginate(1, searchParams, router)}
              disabled={pageIndex === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">Primeira página</span>
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handlePaginate(pageIndex - 1, searchParams, router)
              }
              disabled={pageIndex === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                handlePaginate(pageIndex + 1, searchParams, router)
              }
              disabled={pageIndex === pages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima página</span>
            </Button>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePaginate(pages, searchParams, router)}
              disabled={pageIndex === pages}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Última página</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
