import { UseFormRegister } from 'react-hook-form'
interface InputProps {
   type: React.HTMLInputTypeAttribute
   placeholder: string
   errorMessage?: string
   name: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   register: UseFormRegister<any>
}
export default function Input({ errorMessage, name, register, type, placeholder }: InputProps) {
   return (
      <div className='flex flex-col gap-y-1'>
         <input
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-md border border-gray-300 px-5 py-3 text-base outline-none focus:border-blue-500 ${
               errorMessage && '!border-red-500 text-red-500'
            }`}
            {...register(name)}
         />
         <span className='min-h-[20px] text-red-500'>{errorMessage}</span>
      </div>
   )
}
