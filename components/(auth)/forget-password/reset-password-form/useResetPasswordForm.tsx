import {
  usePasswordTokenControllerFindToken,
  usePasswordTokenControllerResetPassword,
} from '@/src/gen/api'
import { passwordTokenControllerResetPasswordBody } from '@/src/gen/api.zod'
import { ResetPasswordDto } from '@/src/gen/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useResetPasswordForm = ({ token }: { token: string }) => {
  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(passwordTokenControllerResetPasswordBody),
  })

  const { data } = usePasswordTokenControllerFindToken(token)

  const toastId = 'reset-password'

  const { mutate } = usePasswordTokenControllerResetPassword()

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function onSubmit(data: ResetPasswordDto) {
    setIsLoading(true)

    toast.success('Senha redefinindo a senha...', { id: toastId })

    mutate(
      { token, data },
      {
        onSuccess: () => {
          setIsLoading(true)
          toast.success('Senha redefinida com sucesso!', {
            id: toastId,
          })
          router.push('/signin')
        },
        onError: () => {
          toast.error('Senha ', { id: toastId })
        },
        onSettled: () => {
          setIsLoading(false)
        },
      },
    )
  }

  return {
    form,
    isLoading,
    onSubmit,
    data,
  }
}
