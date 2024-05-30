import { ORIGIN } from "./origin.js"

function getAbsoluteURL(path) {
  return ORIGIN + path
}

function attach(targetID, html) {
  const targetElement = document.getElementById(targetID)

  if (targetElement) {
    targetElement.innerHTML = html
  }
}

function detach(targetID) {
  const targetElement = document.getElementById(targetID)

  if (targetElement) {
    targetElement.innerHTML = ''
  }
}

export {getAbsoluteURL, attach, detach}