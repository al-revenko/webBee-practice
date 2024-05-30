import { router } from "../router.js";

const route = "/time";

const units = {
  h: 0,
  m: 0,
  s: 0,
};

setInterval(() => {
  if (units.s < 59) {
    units.s += 1;
  } else if (units.m < 59) {
    units.s = 0;
    units.m += 1;
  } else {
    units.m = 0;
    units.h += 1;
  }
}, 1000);

let intervalID = 0;

function withZero(value) {
  return `${value < 10 ? "0" + value : value}`;
}

function updateTime(timeElement) {
  if ('textContent' in timeElement) {
    const hours = withZero(units.h);
    const minutes = withZero(units.m);
    const seconds = withZero(units.s);

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

function startUpdateTime() {
  const timeElement = document.getElementById("timer");

  if (timeElement) {
    updateTime(timeElement)
    intervalID = setInterval(() => updateTime(timeElement), 1000);
  }
}

router.onRouteAttach(route, startUpdateTime);
router.onRouteDetach(route, () => clearInterval(intervalID));
