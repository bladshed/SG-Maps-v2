async function main() {
 
    function init() {
        let map = initMap();
        let searchResultLayer = L.layerGroup();
        window.addEventListener('DOMContentLoaded', (event) => {
            // setup event listeners here
            document.querySelector('#search-btn').addEventListener('click', async ()=>{
                let query = document.querySelector('#search-input').value;
                let center = map.getBounds().getCenter();
                let results = await search(center.lat, center.lng, query);
                let searchMarkers = [];
                // see note 2
                for(let eachVenue of results.response.venues) {
                    // create a marker for each location
                    let marker = L.marker([eachVenue.location.lat, eachVenue.location.lng]);
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1>`);
                    marker.addTo(searchResultLayer);
                    searchMarkers.push(marker);
                }

                // display the search result layer if it is not displayed
                // see note 3
                if (!map.hasLayer(searchResultLayer)) {
                    map.addLayer(searchResultLayer);
                }
            })
        })
    }

    init();
}

function initMap() {
    let singapore = [1.29, 103.85];
    let map = L.map('singapore-map');
    map.setView(singapore, 13);

    // setup tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
    }).addTo(map);

    return map;
}

main();