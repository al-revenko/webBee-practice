const routes = {
  '/': {
    title: 'My CV',
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


export let currentRoute = '/'

if (currentRoute in routes) {
  document.title = routes[currentRoute].title
}

for (let route in routes) {
  if (route !== currentRoute) {
    const routeContent = document.getElementById(routes[route].contentID)

    if (routeContent) {
      routeContent.hidden = true
    }
  }
}

export function redirect(route) {
  if (route in routes) {
    if (currentRoute !== route && currentRoute in routes) {
      const currentContent = document.getElementById(routes[currentRoute].contentID)
      
      if (currentContent) {
        currentContent.hidden = true
      }
    }
    
    const routeData = routes[route]
    const newContent = document.getElementById(routeData.contentID)

    if (newContent) {
      document.title = routeData.title
      newContent.hidden = false
      currentRoute = route
    }
  }
}