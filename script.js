
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
  const dados = {
    nome: nome || "Sem nome",
    tipo: geojson.geometry.type,
    coordenadas: JSON.stringify(geojson.geometry)
  };

  fetch("https://script.google.com/macros/s/AKfycbw6o2isluZv9qFh2nzYht8XvjBhQHG4i39fX4FftIswyLwGZKHngf-m4skLoQMOtqgpXQ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
  .then(res => {
    if (res.ok) {
      alert("✅ Piquete salvo na planilha!");
    } else {
      alert("❌ Erro ao salvar o piquete.");
    }
  })
  .catch(err => {
    alert("Erro na conexão com o webhook.");
  });
});
