const timer = document.getElementById('timer')

const units = {
  h: 0,
  m: 0,
  s: 0,
}

function withZero(value) {
  return `${value < 10 ? '0' + value : value}`
}

if (timer) {
  setInterval(() => {
    if (units.s <= 58) {
      units.s += 1
    } else if (units.m <= 58) {
      units.s = 0
      units.m += 1
    } else {
      units.m = 0
      units.h += 1
    }

    const hours = withZero(units.h)
    const minutes = withZero(units.m)
    const seconds = withZero(units.s)

    timer.textContent = `${hours}:${minutes}:${seconds}`
  }, 1000)
}

