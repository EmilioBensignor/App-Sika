// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  image: {
    format: ['avif', 'webp'],
    screens: {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1080,
      xl: 1280,
      xxl: 1440,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700;800&display=swap' },
      ]
    }
  },
  fonts: {
    families: [
      {
        name: 'Saira',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800],
      }
    ],
    defaults: {
      weights: [300, 400, 500, 600, 700, 800],
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['material-symbols']
  },
  vite: {
    optimizeDeps: {
      include: ['html2canvas', 'qrcode'],
    },
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      exclude: ['/', '/form', '/quiz', '/loading', '/resultado'],
    },
    clientOptions: {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
        autoRefreshToken: true,
      }
    },
  },
})