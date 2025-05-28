import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { User } from '@/src/gen/types'
import { Settings } from 'lucide-react'
import UpdateUserForm from './update-user-form'

export default function UpdateUserDialog({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Atualizar {user.name}</DialogTitle>
          <DialogDescription>
            Você pode atualizar as informações deste usuário.
          </DialogDescription>
        </DialogHeader>
        <UpdateUserForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
