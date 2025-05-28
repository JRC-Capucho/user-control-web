import { Role } from '@/@types/enum'
import { useCreateUserControllerHandle } from '@/src/gen/api'
import { createUserControllerHandleBody } from '@/src/gen/api.zod'
import { CreateUserDto } from '@/src/gen/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useCreateUserForm = () => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { data: session } = useSession()

  const { mutate } = useCreateUserControllerHandle()

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserControllerHandleBody),
  })

  const userIsSuperAdmin = session?.user.role === Role.GUEST

  const toastId = 'create-user'

  function onSubmit(values: CreateUserDto) {
    toast.loading('Criando usuário...', {
      id: toastId,
    })
    setIsSubmitting(true)
    mutate(
      { data: values },
      {
        onSuccess() {
          toast.success('Usuário criado com sucesso!', {
            id: toastId,
          })
          router.push('/users')
        },
        onError() {
          toast.error('Erro ao criar usuário', {
            id: toastId,
          })
        },
        onSettled: () => {
          setIsSubmitting(false)
        },
      },
    )
  }

  return {
    form,
    onSubmit,
    isSubmitting,
    userIsSuperAdmin,
  }
}
