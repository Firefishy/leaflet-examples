/**
 * XXXXXXXXXXXX
 */

// config map
let config = {
  minZoom: 7,
  maxZomm: 18,
};
// magnification with which the map will start
const zoom = 13;
// co-ordinates
const lat = 52.237049;
const lon = 21.017532;

// calling map
const map = L.map('map', config).setView([lat, lon], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// LEGENDS

// the control element is placed in the bottom right corner
const legend = L.control({
  position: "bottomright"
});

// we create a div with a legend class
const div = L.DomUtil.create("div", "legend");
// color table
const color = ["F7FADA", "B6E1C9", "72C7D4", "64A1CC", "5F6CB3"];
// table of texts that will appear in the popup and legend
const label = ["2-12.5", "12.6-16.8", "16.9-20.9", "21-25.9", "26-plus"];

// we add records to the L.control method
const rows = [];
legend.onAdd = function () {
  color.map((item, index) => {
    rows.push(`
        <div class="row">
          <i style="background: #${item}"></i>${label[index]}
        </div>  
    `);
  });
  div.innerHTML = rows.join("");
  return div;
};

// we are adding a legend to the map
legend.addTo(map);


// MARKERS
const markers = [
  [52.228956, 21.003799],
  [52.258071, 20.986805],
  [52.242728, 21.041565],
  [52.234213, 21.029034],
  [52.251661, 21.003456]
];

// the function creates colorful svg
function colorMarker(color) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path stroke="#000000" fill="#${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"/>
    </svg>`;

  const icon = L.divIcon({
    className: "marker",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16]
  });

  return icon;
}

// let's add markers to the map
markers.map((marker, index) => {
  const lat = marker[0];
  const lng = marker[1];
  L.marker([lat, lng], {
    icon: colorMarker(color[index])
  })
    .bindPopup(`color: #${color[index]}<br>${label[index]}`)
    .addTo(map);
});