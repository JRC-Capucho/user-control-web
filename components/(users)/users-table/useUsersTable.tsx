import { formatDateToRender } from '@/lib/utils'
import { User } from '@/src/gen/types'
import { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import UserRoleBadge from './user-role/user-role-badge'
import DeleteUserDialog from './delete-user-dialog'
import UpdateUserDialog from './update-user-dialog'
import { useFetchUserControllerHandle } from '@/src/gen/api'

export const useUsersTable = () => {
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') || 1)
  const perPage = Number(searchParams.get('perPage') || 10)
  const search = searchParams.get('search') || ''

  const { data: users, isLoading } = useFetchUserControllerHandle(
    {
      page,
      search,
    },
    {
      query: {
        queryKey: ['users', page, search],
      },
    },
  )

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'createdAt',
      header: 'Cadastrado em',
      cell: ({ row }) => {
        return <span>{formatDateToRender(row.original.createdAt)}</span>
      },
    },
    {
      accessorKey: 'role',
      header: 'Cargo',
      cell: ({ row }) => {
        return <UserRoleBadge role={row.original.role} />
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        return (
          <span className="flex gap-2 justify-end">
            <DeleteUserDialog id={row.original.id} />
            <UpdateUserDialog user={row.original} />
          </span>
        )
      },
    },
  ]

  return { users, isLoading, columns, page, perPage }
}
