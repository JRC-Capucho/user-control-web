import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useResetPasswordForm } from './useResetPasswordForm'
import { Skeleton } from '@/components/ui/skeleton'
import AuthWrapper from '../../auth-wrapper'
import PasswordFormField from '@/components/global/form/password-form-field'

export default function ResetPasswordForm({ token }: { token: string }) {
  const { form, isLoading, onSubmit, data } = useResetPasswordForm({ token })

  return (
    <AuthWrapper description={''}>
      <Form {...form}>
        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Redefina sua senha</h1>
              <p>Por favor, insira uma nova senha segura e confirme-a abaixo</p>
            </div>
            <CardContent className="space-y-4">
              {data ? (
                <>
                  <div>
                    <PasswordFormField
                      form={form}
                      label="Senha"
                      name="password"
                      showPasswordGenerator={true}
                      showStrengthPasswordBar={true}
                    />
                  </div>
                  <div>
                    <PasswordFormField
                      form={form}
                      label="Senha"
                      name="password_confirm"
                      showStrengthPasswordBar={true}
                    />
                  </div>
                </>
              ) : (
                <Skeleton className="w-full h-32" />
              )}
            </CardContent>
            <CardFooter className="flex flex-col mt-2">
              <Button className="w-full" type="submit" isLoading={isLoading}>
                Redefinir senha
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  )
}
