import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { calculatePasswordStrength, cn } from '@/lib/utils'

export default function PasswordFormField({
  form,
  name,
  label,
  showStrengthPasswordBar = false,
  showPasswordGenerator = false,
}: {
  form: UseFormReturn<any>
  name: string
  label: string
  showStrengthPasswordBar?: boolean
  showPasswordGenerator?: boolean
}) {
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | null
  >(null)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-4 items-center justify-between">
            <span>{label}</span>
            {showStrengthPasswordBar && (
              <div className="h-2 w-full rounded-md bg-muted">
                <div
                  className={cn(
                    'h-full rounded-md transition-all',
                    passwordStrength === 'weak' && 'bg-red-500 w-1/3',
                    passwordStrength === 'medium' && 'bg-yellow-500 w-2/3',
                    passwordStrength === 'strong' && 'bg-green-500 w-full',
                  )}
                ></div>
              </div>
            )}
          </FormLabel>
          <FormControl>
            <Input
              type="password"
              showPasswordGenerator={showPasswordGenerator}
              placeholder="********"
              {...field}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value)
                if (showStrengthPasswordBar) {
                  setPasswordStrength(calculatePasswordStrength(value))
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
