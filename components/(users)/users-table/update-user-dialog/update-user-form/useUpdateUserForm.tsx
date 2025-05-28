import { Role } from '@/@types/enum'
import { queryClient } from '@/lib/react-query'
import { useEditUserControllerHandle } from '@/src/gen/api'
import { editUserControllerHandleBody } from '@/src/gen/api.zod'
import { EditUserDto } from '@/src/gen/types'
import { User } from '@/src/gen/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useUpdateUserForm = ({ user }: { user: User }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<EditUserDto>({
    resolver: zodResolver(editUserControllerHandleBody),
    defaultValues: {
      ...user,
    },
  })

  const showStudentFields = user.role === Role.GUEST || Role.MANAGER

  const toastId = 'update-user'

  const { mutate } = useEditUserControllerHandle()

  async function onSubmit(data: EditUserDto) {
    toast.loading('Updating user...', {
      id: toastId,
    })
    setIsSubmitting(true)

    mutate(
      { id: user.id, data },
      {
        onSuccess() {
          toast.success('User updated successfully!', {
            id: toastId,
          })
        },
        onError() {
          toast.error('Error updating user', {
            id: toastId,
          })
        },
        onSettled: () => {
          setIsSubmitting(false)
          queryClient.invalidateQueries(['users'])
        },
      },
    )
  }

  return { form, onSubmit, isSubmitting, showStudentFields }
}
