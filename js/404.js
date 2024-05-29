import { ORIGIN } from "./router/origin.js"

window.localStorage.setItem(
  '404-redirect', 
  window.location.href.replace(
    ORIGIN,
    ''
  )
)
window.location = ORIGIN