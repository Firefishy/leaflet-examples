/**
 * Obtaining coordinates of the visible map
 */

// config map
let config = {
  minZoom: 7,
  maxZomm: 18,
};
// magnification with which the map will start
const zoom = 18;
// co-ordinates
const lat = 52.2297700;
const lon = 21.0117800;

// calling map
const map = L.map('map', config).setView([lat, lon], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// first option
let southWest = map.getBounds().getSouthWest().toString();
let northEast = map.getBounds().getNorthEast().toString();

console.log(southWest, northEast)

// second option, by dragging the map
let sn = [];
map.on('dragend', function onDragEnd() {
  Object.entries(map.getBounds()).forEach(item => {
    console.log(item);
    const array = [item[1].lat, item[1].lng];
    sn.push(array);
  });
  console.table(sn);
});