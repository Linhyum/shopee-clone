import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   errorMessage?: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   register?: UseFormRegister<any>
   className?: string
   classNameInput?: string
   classNameError?: string
}
export default function Input({
   errorMessage,
   name,
   register,
   className = 'flex flex-col gap-y-1',
   classNameInput = `w-full rounded-md border border-gray-300 px-5 py-3 text-base outline-none focus:border-blue-500 ${
      errorMessage && '!border-red-500 text-red-500'
   }`,
   classNameError = 'min-h-[20px] text-red-500 text-sm',
   ...rest
}: InputProps) {
   const registerResult = register && name ? register(name) : null
   return (
      <div className={className}>
         <input {...rest} className={classNameInput} {...registerResult} />
         <span className={classNameError}>{errorMessage}</span>
      </div>
   )
}
