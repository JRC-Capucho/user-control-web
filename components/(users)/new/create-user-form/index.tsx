import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateUserForm } from './useCreateUserForm'
import { Send } from 'lucide-react'
import PasswordFormField from '@/components/global/form/password-form-field'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectContent } from '@radix-ui/react-select'
import { Role } from '@/@types/enum'

export default function CreateUserForm() {
  const { form, onSubmit, isSubmitting, userIsSuperAdmin } = useCreateUserForm()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 xl:grid-cols-6 gap-4"
      >
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seuemail@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2">
          <PasswordFormField
            form={form}
            label="Senha"
            name="password"
            showPasswordGenerator={true}
            showStrengthPasswordBar={true}
          />
        </div>

        {userIsSuperAdmin && (
          <>
            <div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                        <SelectItem value={Role.GUEST}>Guest</SelectItem>
                        <SelectItem value={Role.MANAGER}>Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <div className="col-span-full flex justify-end">
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="flex gap-2 w-full xl:w-32"
          >
            <span>Cadastrar</span>
            <Send />
          </Button>
        </div>
      </form>
    </Form>
  )
}
