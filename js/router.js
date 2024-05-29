import { ORIGIN } from "./origin.js"

class Router {
  #routes = {
    '/': {
      title: 'Resume',
      contentID: 'resume',
    },

    '/map': {
      title: 'Map',
      contentID: 'map',
    },

    '/time': {
      title: 'Time',
      contentID: 'time',
    },

    '/404': {
      title: 'Not found',
      contentID: 'not-found',
    },
  }

  #currentRoute = '/'

  constructor() {
    const routeFrom404 = window.localStorage.getItem('404-redirect')

    if (routeFrom404) {
      if (routeFrom404 in this.#routes) {
        this.#currentRoute = routeFrom404
      }

      else if ('/404' in this.#routes) {
        this.#currentRoute = '/404'
      }

      window.localStorage.removeItem('404-redirect')
    }

    const routeData = this.#routes[this.#currentRoute]

    this.replaceInHistory(this.#currentRoute)
    document.title = routeData.title
    
    const routeContent = document.getElementById(routeData.contentID)
    if (routeContent) {
      routeContent.hidden = false
    }
  }

  redirect(route) {
    const notFoundRoute = '/404' in this.#routes ? '/404' : null

    if (route !== this.#currentRoute) {
      const currentContent = document.getElementById(window.history.state)

      if (currentContent) {
        currentContent.hidden = true
      }

      if (route in this.#routes) {
        const routeData = this.#routes[route]

        const routeContent = document.getElementById(routeData.contentID)

        if (routeContent) {
          routeContent.hidden = false
          this.pushToHistory(route)
          document.title = routeData.title
          this.#currentRoute = route
        }

        if (routeData.cb && routeData.cb.length > 0) {
          routeData.cb.map((f) => f(route))
        }
      }

      else if (notFoundRoute) {
        const notFoundData = this.#routes[notFoundRoute]

        const notFoundContent = document.getElementById(notFoundData.contentID)

        if (notFoundContent) {
          notFoundContent.hidden = false
          this.pushToHistory(notFoundRoute)
          document.title = notFoundData.title
          this.#currentRoute = notFoundRoute
        }
      }
    }
  }

  onRouteChange(route, cb) {
    if (route in this.#routes) {
      const routeData = this.#routes[route]
      if (routeData.cb) {
        routeData.cb.push(cb)
      } else {
        routeData.cb = [cb]
      }
    }
  }

  pushToHistory(route) {
    if (route in this.#routes) {
      window.history.pushState(this.#routes[route].contentID, '', this.createURL(route))
    }
  }

  replaceInHistory(route) {
    if (route in this.#routes) {
      window.history.replaceState(this.#routes[route].contentID, '', this.createURL(route))
    }
  }

  createURL(route) {
    return ORIGIN + route
  }

  get currentRoute() {
    return this.#currentRoute
  }
}

export const router = new Router()
