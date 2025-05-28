import { queryClient } from '@/lib/react-query'
import { useDeleteUserControllerHandle } from '@/src/gen/api'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export const useDeleteUserDialog = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const { data: session } = useSession()

  const canDeleteUser = session?.user.id !== id

  const closeRef = useRef<HTMLButtonElement>(null)

  const { mutate } = useDeleteUserControllerHandle()

  const toastId = 'delete-user'

  async function handleDeleteUser(id: string) {
    if (!canDeleteUser) {
      toast.error('You cannot delete your own account')
      return
    }
    toast.loading('Deleting user...', {
      id: toastId,
    })
    setIsDeleting(true)
    mutate(
      { id },
      {
        onSuccess() {
          toast.success('User deleted successfully!', {
            id: toastId,
          })
        },
        onError() {
          toast.error('Error deleting user', {
            id: toastId,
          })
        },
        onSettled: () => {
          queryClient.invalidateQueries(['users'])
          setIsDeleting(false)
          closeRef.current?.click()
        },
      },
    )
  }

  return {
    isDeleting,
    closeRef,
    handleDeleteUser,
    canDeleteUser,
  }
}
