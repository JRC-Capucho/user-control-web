import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Trash2, Undo2 } from 'lucide-react'
import { useDeleteUserDialog } from './useDeleteUserDialog'

export default function DeleteUserDialog({ id }: { id: string }) {
  const { isDeleting, closeRef, handleDeleteUser, canDeleteUser } =
    useDeleteUserDialog({ id })

  return (
    <Dialog>
      <DialogTrigger asChild disabled={!canDeleteUser}>
        <Button disabled={!canDeleteUser} variant="destructive" size={'icon'}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apagar Usuário</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja apagar este usuário? Todos os dados
            vinculados serão apagados permanentemente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button
              ref={closeRef}
              className="flex gap-2"
              type="button"
              variant="secondary"
            >
              <span>Voltar</span>
              <Undo2 />
            </Button>
          </DialogClose>
          <Button
            isLoading={isDeleting}
            variant={'destructive'}
            className="flex gap-2"
            onClick={() => handleDeleteUser(id)}
          >
            <span>Deletar</span>
            <Trash2 />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
