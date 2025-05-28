import { useRegisterUserControllerHandle } from '@/src/gen/api'
import { createUserControllerHandleBody } from '@/src/gen/api.zod'
import { CreateUserDto } from '@/src/gen/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useRegisterForm = () => {
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserControllerHandleBody),
  })

  const { mutate } = useRegisterUserControllerHandle()

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const toastId = 'user-signup'

  function onSubmit(values: CreateUserDto) {
    setIsLoading(true)

    toast.loading('Creating your account...', {
      id: toastId,
    })

    mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsLoading(true)
          signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
          })
            .then((response) => {
              if (response) {
                if (response.error) {
                  toast.error('Error signing in', {
                    id: toastId,
                  })
                  setIsLoading(false)
                  return
                }

                toast.success('Account created successfully!', {
                  id: toastId,
                })

                router.push('/home')
                setIsLoading(false)
              }
            })
            .catch((error) => {
              console.error('Sign in error:', error)
              toast.error('Error signing in', {
                id: toastId,
              })
              setIsLoading(false)
            })
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(
              `Error creating account ${error.response?.data.message}. Please try again.`,
              {
                id: toastId,
              },
            )
          }
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
  }
}
