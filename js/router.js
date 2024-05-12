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
  }

  #currentRoute = '/'

  constructor() {
    if (this.#currentRoute in this.#routes) {
      document.title = this.#routes[this.#currentRoute].title ?? document.title
    }

    for (let route in this.#routes) {
      if (route !== this.#currentRoute) {
        const routeContent = document.getElementById(this.#routes[route].contentID)
        if (routeContent) {
          routeContent.hidden = true
        }
      }
    }
  }

  redirect(route) {
    if (route in this.#routes) {
      if (this.#currentRoute !== route && this.#currentRoute in this.#routes) {
        const currentContent = document.getElementById(this.#routes[this.#currentRoute].contentID)

        if (currentContent) {
          currentContent.hidden = true
        }
      }

      const routeData = this.#routes[route]
      const newContent = document.getElementById(routeData.contentID)

      if (newContent) {
        document.title = routeData.title ?? document.title
        newContent.hidden = false
        this.#currentRoute = route
        routeData.cb.map((cb) => cb(route))
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

  get currentRoute() {
    return this.#currentRoute
  }
}

export const router = new Router()
