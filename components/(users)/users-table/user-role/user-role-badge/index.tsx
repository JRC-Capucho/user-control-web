import { Role } from '@/@types/enum'
import { Badge } from '@/components/ui/badge'

export default function UserRoleBadge({ role }: { role: string }) {
  return (
    <Badge
      variant={
        role === Role.ADMIN
          ? 'default'
          : role === Role.MANAGER
            ? 'outline'
            : role === Role.GUEST
              ? 'info'
              : 'secondary'
      }
      className="w-full"
    ></Badge>
  )
}
