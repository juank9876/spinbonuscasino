
//Nav Options
type navPositionType = "start" | "center" | "end"
const navPositionConfig: navPositionType = "center"
export const navPosition = "justify-" + navPositionConfig

//View transitions
export const isViewTransitions = true
export const isParticles = false

//Language
export const language = "en"

//Hero Video
export const isVideoHero = false
export const heroVideoUrl = "/video/hero-video-1.webm"


//Script brandlisty
export const scriptBrandlisty = "https://intercms.dev/assets/js/brandlisty-processor.js"

export const backgroundColor = '[var(--color-primary-dark)]'

//Console colors
export const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  bgYellow: '\x1b[43m',
  success: '\x1b[32m',
  error: '\x1b[31m',
  info: '\x1b[36m',
};

//Themes
// lib/themeOptions.ts

export const themes = {
  dark: {
    name: 'dark',
    className: 'theme-dark',
  },
  newspaper: {
    name: 'newspaper',
    className: 'theme-rose',
  },
} as const

export type ThemeKey = keyof typeof themes