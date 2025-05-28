import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgetPasswordForm } from './useForgetPasswordForm'
import { Button } from '@/components/ui/button'
import AuthWrapper from '../../auth-wrapper'
import { CardContent, CardFooter } from '@/components/ui/card'

export function ForgetPasswordForm() {
  const { form, onSubmit, isLoading } = useForgetPasswordForm()

  return (
    <AuthWrapper>
      <Form {...form}>
        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
              <p>
                Digite seu email para receber instruções de recuperação de senha
              </p>
            </div>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seuemail@exemplo.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col mt-2">
              <Button className="w-full" type="submit" isLoading={isLoading}>
                Enviar
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  )
}
