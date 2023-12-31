import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

interface Props {
   onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
   const { t } = useTranslation()

   const fileInputRef = useRef<HTMLInputElement>(null)

   //upload image
   const handleUpload = () => {
      fileInputRef.current?.click()
   }

   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileFormLocal = e.target.files?.[0]
      //nếu kích thước bé hơn 1 mb và đúng định dạng ảnh thì mới chạy
      if (fileFormLocal && fileFormLocal.size < 1_048_576 && fileFormLocal.type.includes('image')) {
         onChange?.(fileFormLocal)
      } else {
         toast.error('Dụng lượng file tối đa 1 MB. Định dạng: jpg, jpeg, png')
      }
   }
   return (
      <>
         <input
            ref={fileInputRef}
            onChange={onFileChange}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e) => ((e.target as any).value = null)} //để khi chọn lại tấm ảnh trùng nó vẫn chạy vào onchange
            className='hidden'
            type='file'
            accept='.jpg,.jpeg,.png'
         />
         <button onClick={handleUpload} type='button' className='btn-add-img w-28 h-10 rounded'>
            <span>{t('selectImage')}</span>
            <div />
         </button>
      </>
   )
}
