import Data from './data.js';
import R from 'ramda';
import {
  map as initMap,
  tileLayer,
  icon,
  marker,
} from 'leaflet';

const cinema = geoJSON(Data, {
  onEachFeature:(feature, layer) => layer.bindPopup(feature.properties.name)
});

const map = initMap('map').setView([46.5579, 9.5471], 9)

const iconMap = L.icon({
  iconUrl: 'clapperboard.png',
  iconSize: [512, 512],
  iconAnchor: [256, 256]
});

const osmGR = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const markers = Data.features
  .map(feature => {
    const [lat, lon] = path(['geometry', 'coordinates'], feature)
    marker([lat, lon], { icon: iconMap}).addTo(map)
  })

osmGR.addTo(map)
markers.forEach(marker => marker.addTo(map))
//cinema.addTo(map)