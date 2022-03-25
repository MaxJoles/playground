// Grab collection list wrapper
const mapList = document.querySelector("[max-js=map-list]");


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
map.on('load', (e) => {
    map.addSource("cms-locations", {
        "type": "geojson",
        "data": getLocations()
    });
    map.addLayer({
        "id": "locations",
        "type": "symbol",
        "source": "cms-locations",
        "layout": {
            "icon-image": "turning-circle",
            "icon-allow-overlap": true,
            "icon-size": 0.5
        }
    });
    addInteractions();
});


// Get locaiton data form collection list and format as GEO JSON
function getLocations() {
    let mapItems = Array.from(mapList.childNodes);
    let mapLocations = {
        type: "FeatureCollection",
        features: [],
    };

    // For each collection item, grab hidden fields and convert to geojson property object
    mapItems.forEach(item => {
        let locationLat = item.querySelector("#locationLatitude").value;
        let locationLong = item.querySelector("#locationLongitude").value;
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
    // Return data as object that's passed to Mapbox layer object
    return mapLocations
}


// Gets collection list items and adds mapbox interactivity
function addInteractions() {
    let mapItems = Array.from(mapList.childNodes);
    mapItems.forEach(item => {
        let locationLat = item.querySelector("#locationLatitude").value;
        let locationLong = item.querySelector("#locationLongitude").value;
        let locationName = item.querySelector(".listing-name").innerText;
        let coordinates = [locationLong, locationLat];

        // Add popup when mouse enters list item
        item.addEventListener('mouseenter', () => {
            let popUps = document.getElementsByClassName('mapboxgl-popup');
            if (popUps[0]) popUps[0].remove();
            popup.setLngLat(coordinates).setHTML('<h3>' + locationName + '</h3>').addTo(map);
        });

        item.addEventListener('click', () => {
            map.flyTo({
                center: coordinates,
                zoom: 15
            });
        })


        // Remove popup when mouse leaves list item
        item.addEventListener('mouseleave', () => {
            popup.remove();
        });

    }



// Listens for changes to collection list data caused by Finsweet filter
const config = { childList: true };
    const listObserver = (mutationsList, observer) => {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let newData = getLocations();
                map.getSource('cms-locations').setData(newData);
            }
        }
    };
    const observer = new MutationObserver(listObserver);
    observer.observe(mapList, config);
