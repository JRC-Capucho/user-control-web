import { DataTable } from '@/components/global/listing/data-table'
import { useUsersTable } from './useUsersTable'
import { Pagination } from '@/components/ui/pagination'
import SearchToolbar from '@/components/global/listing/search-toolbar'

export default function UsersTable() {
  const { users, isLoading, columns, page, perPage } = useUsersTable()

  return (
    <div className="w-full max-w-full">
      <SearchToolbar link={'/users/new'} />
      <DataTable
        columns={columns}
        data={users?.data || []}
        isLoading={isLoading}
      />
      {users && users.meta.total > 0 && (
        <Pagination
          pageIndex={page}
          perPage={perPage}
          totalCount={users.meta.total}
        />
      )}
    </div>
  )
}
