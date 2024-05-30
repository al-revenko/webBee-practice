import { getAbsoluteURL, attach, detach } from "./uttils.js"

const routes = {
  '/': {
    title: 'Resume',
    id: 'resume',
    component: './components/resume.html',
    root: 'page'
  },

  '/map': {
    title: 'Map',
    id: 'map',
    component: './components/map.html',
    root: 'page'
  },

  '/time': {
    title: 'Time',
    id: 'time',
    component: './components/timer.html',
    root: 'page'
  },

  '/404': {
    title: 'Not found',
    id: 'not-found',
    component: './components/not-found.html',
    root: 'page'
  },
}

class Router {
  #currentRoute = '/'
  #routes = null
  #notFoundRoute = null

  constructor(routes, notFoundRoute = '/404') {
    this.#routes = routes
    this.#notFoundRoute = notFoundRoute

    let initRoute;

    const routeFrom404 = window.localStorage.getItem('404-redirect')

    if (routeFrom404) {
      if (routeFrom404 in this.#routes) {
        initRoute = routeFrom404
      }

      else if (this.#notFoundRoute in this.#routes) {
        initRoute = this.#notFoundRoute
      }
      
      window.localStorage.removeItem('404-redirect')
    }
    
    else {
      initRoute = this.#currentRoute
    }

    this.replaceInHistory(initRoute)
    this.render(initRoute)

    window.onpopstate = (ev) => {
      if (ev.state && ev.state !== this.#currentRoute) {
        this.render(ev.state)
      }
    }
  }

  redirect(route) {
    if (route in this.#routes) {
      this.pushToHistory(route)
      this.render(route)
    } 

    else if (this.#notFoundRoute in this.#routes) {
      this.pushToHistory(this.#notFoundRoute)
      this.render(this.#notFoundRoute)
    }
  }

  async render(route) {
    const routeData = this.#routes[route]
    const currentRouteData = this.#routes[this.#currentRoute]

    if (routeData) {
      const html = await fetch(routeData['component']).then((response) => response.text())
      
      if (html) {
        detach(currentRouteData.root)
        if (currentRouteData.onDetach) {
          currentRouteData.onDetach.map((f) => f(this.#currentRoute))
        }

        attach(routeData.root, html)
        document.title = routeData.title
        this.#currentRoute = route
        
        if (routeData.onAttach) {
          routeData.onAttach.map((f) => f(route))
        }
      }
    }
  }

  onRouteAttach(route, cb) {
    if (route in this.#routes) {
      const routeData = this.#routes[route]
      if (routeData.onAttach) {
        routeData.onAttach.push(cb)
      } else {
        routeData.onAttach = [cb]
      }
    }
  }

  onRouteDetach(route, cb) {
    if (route in this.#routes) {
      const routeData = this.#routes[route]
      if (routeData.onDetach) {
        routeData.onDetach.push(cb)
      } else {
        routeData.onDetach = [cb]
      }
    }
  }

  pushToHistory(route) {
    if (route in this.#routes) {
      window.history.pushState(route, '', getAbsoluteURL(route))
    }
  }

  replaceInHistory(route) {
    if (route in this.#routes) {
      window.history.replaceState(route, '', getAbsoluteURL(route))
    }
  }

  get currentRoute() {
    return this.#currentRoute
  }
}

export const router = new Router(routes)
