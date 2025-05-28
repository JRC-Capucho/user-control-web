import { authenticateControllerHandleBody } from '@/src/gen/api.zod'
import { AuthenticateDto } from '@/src/gen/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useLoginForm = () => {
  const form = useForm<AuthenticateDto>({
    resolver: zodResolver(authenticateControllerHandleBody),
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function onSubmit(values: AuthenticateDto) {
    setIsLoading(true)

    const toastId = 'user-signin'

    toast.loading('Signing in...', { id: toastId })

    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then(async (response) => {
        if (response) {
          if (response.error) {
            toast.error('Login error', { id: toastId })
            setIsLoading(false)
            return
          }

          const session = await getSession()
          if (session?.token) {
            localStorage.setItem('orvalToken', session.token)
          }

          toast.success('Login successful!', { id: toastId })
          router.push('/home')
          setIsLoading(false)
        }
      })
      .catch((err) => {
        toast.error(`Login error ${err}`, { id: toastId })
        setIsLoading(false)
      })
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}
