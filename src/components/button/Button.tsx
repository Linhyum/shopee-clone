interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   children: string
   isLoading?: boolean
}
export default function Button({ children, isLoading, ...rest }: Props) {
   return (
      <button
         {...rest}
         className='w-full  rounded-md bg-primary py-3 text-base text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
      >
         {isLoading ? (
            <div className='mx-auto h-6 w-6 animate-spin rounded-full border-4 border-white border-b-transparent border-t-transparent'></div>
         ) : (
            children
         )}
      </button>
   )
}
