import { router } from "./router.js";

const resumeNavBtn = document.getElementById('navBtnResume')
const mapNavBtn = document.getElementById('navBtnMap')
const timeNavBtn = document.getElementById('navBtnTime')

const navBtns = {
  '/': resumeNavBtn,
  '/map': mapNavBtn,
  '/time': timeNavBtn,
}

let currentActive = null

const setActive = (route) => {
  if (route in navBtns) {
    const navBtn = navBtns[route]

    if (currentActive) {
      currentActive.classList.remove('active')
    }
    
    navBtn.classList.add('active')

    currentActive = navBtn
  }
}

router.onRouteChange('/', setActive)
router.onRouteChange('/map', setActive)
router.onRouteChange('/time', setActive)

if (router.currentRoute in navBtns) {
  setActive(router.currentRoute)
}

resumeNavBtn.addEventListener('click', () => {
  router.redirect('/')
})

mapNavBtn.addEventListener('click', () => {
  router.redirect('/map')
})

timeNavBtn.addEventListener('click', () => {
  router.redirect('/time')
})