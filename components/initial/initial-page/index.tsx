'use client'
import AuthWrapper from '@/components/(auth)/auth-wrapper'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { StickyBanner } from '@/components/ui/sticky-banner'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function InitialPage() {
  const { status } = useSession()

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'unauthenticated') {
        setShowBanner(true)
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [status])

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        {showBanner && (
          <StickyBanner className="bg-gradient-to-b from-blue-800 to-blue-900 fixed">
            <Link
              href="/signin"
              className="mx-0 max-w-[90%] text-white drop-shadow-md"
            >
              Clique aqui para fazer o login!
            </Link>
          </StickyBanner>
        )}
        <div className="w-full max-w-sm md:max-w-3xl">
          <AuthWrapper title="" description="">
            <div className="flex justify-center items-center flex-col py-12 gap-6">
              <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-primary dark:text-transparent md:text-5xl">
                Welcome, <br /> Your user control
              </h1>
              <p>Obrigado por fazer parte da nossa jornada!</p>
              <div className="flex items-center justify-center gap-4 w-full">
                {status === 'unauthenticated' && (
                  <Link href="/signin">
                    <Button className="w-full max-w-[14rem]">Sign In</Button>
                  </Link>
                )}
                <Dialog>
                  <DialogTrigger>
                    <Link href="/signup">
                      <Button className="w-full max-w-[14rem]">Sign Up</Button>
                    </Link>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </AuthWrapper>
        </div>
      </div>
    </>
  )
}
