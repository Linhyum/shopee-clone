import { FloatingPortal, useFloating, arrow, shift, offset } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import React, { ElementType, useRef, useState } from 'react'

interface Props {
   children: React.ReactNode
   renderPopover: React.ReactNode
   as?: ElementType //custom thẻ
   initialOpen?: boolean
}
export default function Popover({ children, renderPopover, as: Element = 'div', initialOpen = false }: Props) {
   const [open, setOpen] = useState<boolean>(initialOpen)
   const arrowRef = useRef<HTMLElement>(null)
   const { refs, x, y, strategy, middlewareData } = useFloating({
      middleware: [offset(10), shift(), arrow({ element: arrowRef })], //offet là khoảng cách từ trên xuống(px), shirt để luôn hiển thị đúng vị trí khi reponsive
      placement: 'bottom-end' // vị trí hiển thị
   })
   const showPopover = () => {
      setOpen(true)
   }
   const hidePopover = () => {
      setOpen(false)
   }
   return (
      // cái tooltip sẽ định vị theo thằng có ref={refs.setReference} nên để đâu cũng dc
      <Element
         className='relative flex cursor-pointer items-center gap-x-1 hover:text-white/70'
         ref={refs.setReference}
         onMouseEnter={showPopover}
         onMouseLeave={hidePopover}
      >
         {children}
         <div className='absolute top-full h-5 w-full bg-transparent' />
         <AnimatePresence>
            {open && (
               <FloatingPortal>
                  <motion.div
                     ref={refs.setFloating}
                     style={{
                        position: strategy,
                        left: x,
                        top: y,
                        width: 'max-content',
                        transformOrigin: `calc(${middlewareData.arrow?.x}px + 12px) top`
                     }}
                     initial={{ opacity: 0, transform: 'scale(0)' }}
                     animate={{ opacity: 1, transform: 'scale(1)' }}
                     exit={{ opacity: 0, transform: 'scale(0)' }}
                     transition={{ duration: 0.2 }}
                  >
                     <span
                        ref={arrowRef}
                        className='absolute h-[10px] w-6 -translate-y-full bg-white dark:bg-slate-700'
                        style={{
                           left: middlewareData.arrow?.x,
                           top: middlewareData.arrow?.y,
                           clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                        }}
                     />
                     {renderPopover}
                  </motion.div>
               </FloatingPortal>
            )}
         </AnimatePresence>
      </Element>
   )
}
