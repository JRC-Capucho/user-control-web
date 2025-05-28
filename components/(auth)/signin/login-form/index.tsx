import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import AuthWrapper from '../../auth-wrapper'
import { useLoginForm } from './useLoginForm'

export function LoginForm() {
  const { form, isLoading, onSubmit } = useLoginForm()

  return (
    <AuthWrapper
      title="Login"
      description="Sign in to your account to access the dashboard and manage your users"
    >
      <Form {...form}>
        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/signup"
                    className="text-sm text-primary hover:underline"
                  >
                    Don&apos;t have an account?{' '}
                  </Link>
                </div>
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="********"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col mt-2">
              <Button className="w-full" type="submit" isLoading={isLoading}>
                Sign In
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  )
}
