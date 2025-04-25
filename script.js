
const map = L.map('map').setView([-5.0, -38.0], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  edit: { featureGroup: drawnItems },
  draw: {
    polygon: true,
    polyline: true,
    rectangle: false,
    circle: false,
    marker: true
  }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
  const layer = e.layer;
  drawnItems.addLayer(layer);

  const geojson = layer.toGeoJSON();
  const nome = prompt("Nome do piquete:");

  const form = document.createElement("form");
  form.action = "https://script.google.com/macros/s/AKfycbw6o2isluZv9qFh2nzYht8XvjBhQHG4i39fX4FftIswyLwGZKHngf-m4skLoQMOtqgpXQ/exec";
  form.method = "POST";
  form.target = "_blank";
  form.style.display = "none";

  const inputNome = document.createElement("input");
  inputNome.name = "nome";
  inputNome.value = nome || "Sem nome";

  const inputTipo = document.createElement("input");
  inputTipo.name = "tipo";
  inputTipo.value = geojson.geometry.type;

  const inputCoord = document.createElement("input");
  inputCoord.name = "coordenadas";
  inputCoord.value = JSON.stringify(geojson.geometry);

  form.appendChild(inputNome);
  form.appendChild(inputTipo);
  form.appendChild(inputCoord);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  alert("✅ Piquete enviado!");
});
