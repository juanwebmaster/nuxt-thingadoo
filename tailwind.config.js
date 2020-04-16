/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    minHeight: {
      carousel: '200px',
      resourceDesc: '120px'
    },
    spinner: (theme) => ({
      default: {
        color: '#dae1e7', // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms' // the speed at which the spinner should rotate
      }
      // md: {
      //   color: theme('colors.red.500', 'red'),
      //   size: '2em',
      //   border: '2px',
      //   speed: '500ms',
      // },
    }),
    screens: {
      phone: '480px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '800px',
      // => @media (min-width: 768px) { ... }

      lg: '1200px',
      // => @media (min-width: 1024px) { ... }

      xl: '1366px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1600px',
      // => @media (min-width: 1280px) { ... }
      xxxl: '1900px'
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '1/9': '12%',
        '2/9': '22%',
        '3/9': '28%',
        '4/9': '40%',
        '5/9': '55%',
        '6/9': '63%'
      },
      colors: {
        white: {
          default: '#ffffff'
        },
        dark: {
          '70': '#272121',
          '80': '#362F2F',
          '90': '#2B2424',
          default: '#201919'
        },
        primary: {
          '70': '#8b03ff',
          '80': '#7F00EC'
        }
      }
    },

    fontFamily: {
      sans: [
        'Raleway',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]

      // ...
    },
    customForms: (theme) => ({
      default: {
        'input, textarea, multiselect, select': {
          borderRadius: theme('borderRadius.md'),
          backgroundColor: theme('colors.dark.70'),
          borderColor: 'transparent'
        },
        select: {
          backgroundColor: theme('colors.dark.70')
        }
      }
    })
  },
  variants: { spinner: ['responsive'] },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-spinner')()
  ]
}
