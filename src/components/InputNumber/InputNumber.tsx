import { InputHTMLAttributes, forwardRef } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
   errorMessage?: string
   classNameInput?: string
   classNameError?: string
}
export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumerInner(
   {
      errorMessage,
      className = 'flex flex-col gap-y-1',
      classNameInput = `w-full rounded-md border border-gray-300 px-5 py-3 text-base outline-none focus:border-blue-500 ${
         errorMessage && '!border-red-500 text-red-500'
      }`,
      classNameError = 'min-h-[20px] text-red-500 text-sm',
      onChange,
      ...rest
   },
   ref
) {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if ((/^\d+$/.test(value) || value === '') && onChange) {
         onChange(e)
      }
   }
   return (
      <div className={className}>
         <input {...rest} className={classNameInput} onChange={handleChange} ref={ref} />
         <span className={classNameError}>{errorMessage}</span>
      </div>
   )
})
