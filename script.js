function toggleMenu() {
    document.getElementById("opt").classList.toggle("show");
}
//leaflet standard documentation: not coding 
const nepalBounds = [
    [26.347, 80.058], // Southwest boundary
    [30.447, 88.201]  // Northeast boundary
];
const map = L.map('map', {
    maxBounds: nepalBounds,
    maxBoundsViscosity: 1.0, // Prevents panning outside Nepal
    minZoom: 7,
    maxZoom: 15
}).setView([28.3949, 84.1240], 6.5); // Centered on Nepal at zoom level 7
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);