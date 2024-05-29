export const ORIGIN = window.location.hostname.split('.').at(-2) === 'github'
  ? new URL(window.location.pathname.split('/')[1], window.location.origin).toString()
  : window.location.origin