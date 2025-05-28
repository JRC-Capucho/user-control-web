import * as React from 'react'
import { Eye, EyeOff, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

function Input({
  className,
  type,
  showPasswordGenerator = false,
  ...props
}: React.ComponentProps<'input'> & {
  showPasswordGenerator?: boolean
}) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type

  const generateSecurePassword = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?'
    const passwordLength = 14
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }
    if (props.onChange) {
      props.onChange({
        target: { value: password },
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className,
        )}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={cn(
            'absolute top-[10px] cursor-pointer flex items-center text-muted-foreground',
            {
              'right-3': !showPasswordGenerator,
              'right-10': showPasswordGenerator,
            },
          )}
          tabIndex={-1}
        >
          {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
      {type === 'password' && showPasswordGenerator && (
        <button
          type="button"
          onClick={generateSecurePassword}
          className="absolute top-[10px] cursor-pointer right-3 flex items-center text-muted-foreground"
          tabIndex={-1}
        >
          <RefreshCw size={16} />
        </button>
      )}
    </div>
  )
}

export { Input }
