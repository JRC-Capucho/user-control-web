import { Role } from '@/@types/enum'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function WelcomeCard() {
  const { data: session } = useSession()

  return (
    <div className="w-full h-full bg-white/[0.96] dark:bg-black/[0.96] rounded-lg shadow-md">
      <div className="relative flex h-full w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center">
        <div
          className={cn(
            'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none',
          )}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-primary dark:text-transparent md:text-7xl">
            Welcome, <br /> You are using user control
          </h1>
          <div className="min-h-28 pt-4">
            {session && (
              <>
                {session.user.role === Role.ADMIN && (
                  <p className="mx-auto max-w-lg text-center text-base font-normal text-primary">
                    Hello, {session.user.name}, you are a super admin with full
                    control over the user control.
                  </p>
                )}

                {session.user.role === Role.MANAGER && (
                  <>
                    <p className="mx-auto mt-4 max-w-4xl text-center text-base font-normal text-primary">
                      Hello,{' '}
                      <span className="font-bold">{session.user.name}</span>,
                      this user manager system is designed to enhance your user
                      control and management capabilities.
                    </p>
                  </>
                )}

                {session.user.role === Role.GUEST && (
                  <p className="mx-auto max-w-lg text-center text-base font-normal text-primary">
                    Hello, {session.user.name}, welcome to our user manager!
                    Thank you for joining us to streamline user control and
                    management processes.
                  </p>
                )}
                {session.user.role === Role.ADMIN && (
                  <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                    <Link href={'/users'}>
                      <Button className="w-32">Users</Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
