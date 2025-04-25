
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

  console.log("🔁 Dados capturados:", dados);

  // Aqui vai o envio para planilha via webhook futuramente
  alert("Piquete salvo localmente. Integração com planilha será feita depois.");
});
