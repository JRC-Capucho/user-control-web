import { usePasswordTokenControllerForgetPassword } from '@/src/gen/api'
import { passwordTokenControllerForgetPasswordBody } from '@/src/gen/api.zod'
import { ForgetPasswordDto } from '@/src/gen/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useForgetPasswordForm = () => {
  const form = useForm<ForgetPasswordDto>({
    resolver: zodResolver(passwordTokenControllerForgetPasswordBody),
  })

  const toastId = 'forget-password'
  const { mutate } = usePasswordTokenControllerForgetPassword()

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function onSubmit(values: ForgetPasswordDto) {
    setIsLoading(true)
    toast.loading('Enviando o email para redefinir a senha...', {
      id: toastId,
    })

    mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsLoading(false)
          toast.success('Enviado com sucesso', { id: toastId })
          router.push('signin')
        },
        onError: () => {
          toast.error('Error ao enviar o email', { id: toastId })
        },
        onSettled: () => {
          setIsLoading(false)
        },
      },
    )
  }

  return {
    form,
    onSubmit,
    isLoading,
  }
}
