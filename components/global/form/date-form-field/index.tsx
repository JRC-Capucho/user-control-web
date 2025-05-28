import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import MaskInput from '@/components/ui/imask-input'
import { Controller, UseFormReturn } from 'react-hook-form'
import { IMask } from 'react-imask'

export default function DateFormField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<any>
  name: string
  label: string
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Controller
              name={name}
              control={form.control}
              render={({ field }) => (
                <MaskInput
                  field={field}
                  unmask={false}
                  mask="d0/M0/YYyy"
                  blocks={{
                    d0: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 31,
                    },
                    M0: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 12,
                    },
                    YY: {
                      mask: IMask.MaskedRange,
                      from: 18,
                      to: 29,
                    },
                    yy: {
                      mask: IMask.MaskedRange,
                      from: 0,
                      to: 99,
                    },
                  }}
                  placeholder="06/09/2003"
                  onAccept={(value: string) => {
                    if (value.length < 10) {
                      return
                    }
                    form.setValue(name, value)
                    field.onChange(value)
                  }}
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
