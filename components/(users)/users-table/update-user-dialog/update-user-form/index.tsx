import { User } from '@/src/gen/types'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Save, Undo2 } from 'lucide-react'
import { useUpdateUserForm } from './useUpdateUserForm'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import DateFormField from '@/components/global/form/date-form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Role } from '@/@types/enum'
export default function UpdateUserForm({ user }: { user: User }) {
  const { form, onSubmit, showStudentFields } = useUpdateUserForm({ user })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="col-span-2">
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <DateFormField
            form={form}
            name="birthdate"
            label="Data de Nascimento"
          />
        </div>

        {showStudentFields && (
          <>
            <div className="col-span-2">
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

        <div className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button className="flex gap-2" type="button" variant="secondary">
              <span>Voltar</span>
              <Undo2 />
            </Button>
          </DialogClose>
          <Button type="submit" className="flex gap-2">
            <span>Atualizar</span>
            <Save />
          </Button>
        </div>
      </form>
    </Form>
  )
}
