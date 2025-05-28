'use client'
import { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LightTheme = () => {
  return <Sun size={20} />
}

const DarkTheme = () => {
  return <Moon size={20} />
}

export const ThemeChanger = () => {
  const [theme, setThemeState] = useState<string | null>(null)

  const getTheme = () => {
    return localStorage.getItem('theme') || 'dark'
  }

  const setTheme = (newTheme: string) => {
    localStorage.setItem('theme', newTheme)
    setThemeState(newTheme)
    document.documentElement.className = newTheme
  }

  useEffect(() => {
    const currentTheme = getTheme()
    setThemeState(currentTheme)
    document.documentElement.className = currentTheme
  }, [])

  return (
    <div suppressHydrationWarning className="fixed bottom-4 right-8">
      <Popover>
        <PopoverTrigger suppressHydrationWarning>
          <Button
            size="default"
            className="flex justify-center w-10 h-10"
            variant={'outline'}
          >
            {theme === 'light' ? <LightTheme /> : <DarkTheme />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-3 max-w-16 p-2 justify-center items-center">
          <Button
            size={'icon'}
            variant={'outline'}
            disabled={theme === 'light'}
            onClick={() => setTheme('light')}
          >
            <LightTheme />
          </Button>
          <Button
            size={'icon'}
            variant={'outline'}
            disabled={theme === 'dark'}
            onClick={() => setTheme('dark')}
          >
            <DarkTheme />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
