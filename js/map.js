import { router } from "./router/router.js";

const route = '/map'

let mapReady = false

export async function initMap() {
  if (mapReady) {
    return
  }

  const mapContainer = document.getElementById('map-content')
  const preloadContainer = document.getElementById('map-preloader')

  if (mapContainer) {
    const markerElement = document.createElement('img')
    markerElement.src = './assets/icons/point.png'
    markerElement.className = 'map-marker'

    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const map = new YMap(
      mapContainer,
      {
        location: {
          center: [30.289440, 59.932770],
          zoom: 17
        }
      }
    );

    const marker = new YMapMarker(
      {
        coordinates: [30.289440, 59.932770],
        draggable: false,
      },
      markerElement
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());
    map.addChild(marker)

    if (preloadContainer) {
      // Добавил задержку чтобы можно было увидеть прелоадер 
      setTimeout(() => preloadContainer.hidden = true, 2000)
    }

    mapReady = true
  }
}

if (router.currentRoute === route) {
  initMap()
}

router.onRouteChange(route, initMap)