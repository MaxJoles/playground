// Grab list and items
const mapList = document.querySelector("[max-js=map-list]");
const mapItems = Array.from(mapList.childNodes);



// Initialize empty Mapbox map in #Map container
mapboxgl.accessToken =
    "pk.eyJ1IjoibWFqbzQ2NDAiLCJhIjoiY2tkZjA5MWE2MWQ0bzMycGVlM3g3c2RxdSJ9.bqf5ebGVRpslYVqfCGHqjw";


// Initialize map and load in #map wrapper
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/majo4640/ckdf03vg800581il2pp1eq3eq",
    center: [-69.8009033, 44.3335332],
    zoom: 6,
});

// Initialize popup object that will be added to map later
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});


//When map is loaded initialize with data
map.on('load', function (e) {
    map.addLayer({
        "id": "locations",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": getLocations()
        },
        "layout": {
            "icon-image": "turning-circle",
            "icon-allow-overlap": true,
            "icon-size": 0.5
        }
    });
    addInteractions();
});


// For each item, grab hidden fields and convert to geojson proerty
function getLocations() {
    // create empty locations object formatted as GeoJson
    let mapLocations = {
        type: "FeatureCollection",
        features: [],
    };
    mapItems.forEach(item => {
        let locationLat = item.querySelector("#locationLatitude").value;
        let locationLong = item.querySelector("#locationLongitude").value;
        let locationName = item.querySelector(".listing-name").innerText;
        let coordinates = [locationLong, locationLat];
        let locationID = item.querySelector("#locationID").value;
        let geoData = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coordinates
            },
            "properties": {
                "id": locationID,
            }
        }
        mapLocations.features.push(geoData);

    });
    // Return data as object that we'll call in mapbox layer object
    return mapLocations
}

function addInteractions() {
    mapItems.forEach(item => {
        let locationLat = item.querySelector("#locationLatitude").value;
        let locationLong = item.querySelector("#locationLongitude").value;
        let locationName = item.querySelector(".listing-name").innerText;
        let coordinates = [locationLong, locationLat];

        // Add popup when mouse enters list item
        item.addEventListener('mouseenter', () => {
            let popUps = document.getElementsByClassName('mapboxgl-popup');
            /** Check if there is already a popup on the map and if so, remove it */
            if (popUps[0]) popUps[0].remove();
            popup.setLngLat(coordinates).setHTML('<h3>' + locationName + '</h3>').addTo(map);
        });

        // Remove popup when mouse leaves list item
        item.addEventListener('mouseleave', () => {
            popup.remove();
        });
    })

}






// Mutation listener for filtered list
const config = { childList: true };

const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            addMapPoints();
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(mapList, config);