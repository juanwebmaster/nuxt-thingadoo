import toastConfig from './config/toast'
import authConfig from './config/auth'

require('dotenv').config()

export default {
  mode: 'universal',
  env: {
    API_URL: process.env.API_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Thingadoo |  Virtual Community Event Calendar' || '',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Thingadoo helps you organize and discover virtual events hosted by other community members'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Thingadoo helps you organize and discover virtual events hosted by other community members'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Thingadoo | Organize and discover virtual events'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Thingadoo'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'events, gatherings, activities, fun, ithaca, finger lakes, cortland, hector, trumansburg, calendar'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/globalcss/vue-slick-carousel.css' },
      { rel: 'stylesheet', href: '/globalcss/vue-slick-carousel-theme.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#7F00EC' },
  /*
   ** Global CSS
   */
  css: [
    { src: 'vue-multiselect/dist/vue-multiselect.min.css', lang: 'css' },
    {
      src: 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css',
      lang: 'css'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-js-modal.js',
    '~/plugins/vue2-perfect-scrollbar.js',
    '~/plugins/vue-linkify.js',
    '~/plugins/vue-timepicker.js',
    { src: '~/plugins/vue-multiselect.js', ssr: false },
    { src: '~/plugins/vue-youtube-player.js', ssr: false },
    { src: '~/plugins/vue-social-sharing', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    'nuxt-svg-loader',
    [
      'nuxt-gmaps',
      {
        key: process.env.GOOGLE_MAPS_API_KEY
        // you can use libraries: ['places']
      }
    ],
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'lg',
        breakpoints: {
          phone: 480,
          sm: 640,
          md: 800,
          lg: 1200,
          xl: 1366,
          xxl: 1600,
          xxxl: 1900
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  toast: toastConfig,
  auth: authConfig,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['vue-multiselect'],
    extend(config, ctx) {}
  }
}
