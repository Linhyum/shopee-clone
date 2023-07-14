import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'
export interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
   classNameInput?: string
   classNameError?: string
}

function InputV2<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputV2Props) {
   const {
      type,
      onChange,
      className = 'flex flex-col gap-y-1',
      classNameInput = `w-full rounded-md border border-gray-300 px-5 py-3 text-base outline-none focus:border-blue-500`,
      classNameError = 'min-h-[20px] text-red-500 text-sm',
      value = '',
      ...rest
   } = props
   const { field, fieldState } = useController(props)
   const [localValue, setLocalValue] = useState<string>(field.value)
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueFormInput = e.target.value
      const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
      if (numberCondition || type !== 'number') {
         //cập nhật localValue state
         setLocalValue(valueFormInput)
         //gọi field.onchange để cập nhật state trong react-hook-form
         field.onChange(e)
         //thực thi onchange callback từ bên ngoài truyền vào
         onChange?.(e)
      }
   }
   return (
      <div className={className}>
         <input {...rest} {...field} className={classNameInput} value={value || localValue} onChange={handleChange} />
         <span className={classNameError}>{fieldState.error?.message}</span>
      </div>
   )
}
export default InputV2
// type Gen<TFunc> = {
//    getName: TFunc
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(_props: {
//    person: Gen<TFunc>
//    lastName: TLastName
// }) {
//    return null
// }

// const handleName: () => 'linh' = () => 'linh'

// function App() {
//    return <Hexa person={{ getName: handleName }} lastName='linh' />
// }
