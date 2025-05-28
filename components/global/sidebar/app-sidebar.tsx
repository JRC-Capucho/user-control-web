'use client'

import type * as React from 'react'

import { NavMain } from '@/components/global/sidebar/nav-main'
import { NavUser } from '@/components/global/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import Image from 'next/image'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { Role } from '@/@types/enum'
import { User } from 'lucide-react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()

  const { data: session } = useSession()

  const isAdmin = session?.user?.role === Role.ADMIN
  const isManager = session?.user?.role === Role.MANAGER
  const isGuest = session?.user?.role === Role.GUEST

  const userItems = session
    ? isAdmin
      ? [
          {
            title: 'Listar',
            url: '/users',
          },
          {
            title: 'Cadastrar novo',
            url: '/users/new',
          },
          {
            title: 'Lista de espera',
            url: '/users/waiting-list',
          },
        ]
      : [
          {
            title: 'Listar',
            url: '/users',
          },
          {
            title: 'Cadastrar novo',
            url: '/users/new',
          },
          {
            title: 'Lista de espera',
            url: '/users/waiting-list',
          },
        ]
    : []

  const navMain =
    session && (isAdmin || isManager || isGuest)
      ? [
          {
            title: 'Usuários',
            url: '#',
            icon: User,
            items: userItems,
          },
        ]
      : []

  const data = {
    navMain: navMain,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/home">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer py-8"
              >
                <div
                  className={cn(
                    'text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg',
                    {
                      'size-8': !open,
                      'size-12': open,
                    },
                  )}
                >
                  <Image
                    src={'/img/logo.jpg'}
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">O Farol</span>
                  <span className="truncate text-xs">
                    Vocês são a luz do mundo
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {session ? (
          <NavUser user={session.user} />
        ) : (
          <Skeleton className="h-12 w-full" />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
