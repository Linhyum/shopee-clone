/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#ee4d2d',
            secondary: '#767676'
         }
      }
   },
   corePlugins: {
      container: false //xoá class container ra khỏi tailwind
   },
   //tạo tại class container mới
   plugins: [
      plugin(function ({ addComponents }) {
         addComponents({
            '.container': {
               maxWidth: '1248px',
               width: '100%',
               marginLeft: 'auto',
               marginRight: 'auto',
               paddingLeft: '12px',
               paddingRight: '12px'
            }
         })
      })
   ]
}
