import { redirect, currentRoute } from "./router.js";

const resumeNavBtn = document.getElementById('navBtnResume')
const mapNavBtn = document.getElementById('navBtnMap')
const timeNavBtn = document.getElementById('navBtnTime')

const navBtns = {
  '/': resumeNavBtn,
  '/map': mapNavBtn,
  '/time': timeNavBtn,
}

let currentActive = null

const setActive = (navBtn) => {
  navBtn.classList.add('active')

  if (currentActive) {
    currentActive.classList.remove('active')
  }
  currentActive = navBtn
}

if (currentRoute in navBtns) {
  setActive(navBtns[currentRoute])
}



resumeNavBtn.addEventListener('click', () => {
  setActive(resumeNavBtn)
  redirect('/')
})

mapNavBtn.addEventListener('click', () => {
  setActive(mapNavBtn)
  redirect('/map')
})

timeNavBtn.addEventListener('click', () => {
  setActive(timeNavBtn)
  redirect('/time')
})