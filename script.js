const icon = {
    url: "https://img.icons8.com/fluent-systems-filled/2x/marker.png",
    scaledSize: new google.maps.Size(20, 20), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
};

const originalMap = new google.maps.Map(document.getElementById("map"), {
    zoom: 13.5,
    center: {
        lat: 53.346037,
        lng: -6.259666,
    },
});

let infoWindow;
let testArr = [];

const testing = async () => {
    let x = await fetch(
        "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=456a9e9508f3197447124dbea293285da7f88ca1"
    )
        .then((res) => res.json())
        .then((res) =>
            res.forEach((item) => {
                console.log(item);
                let marker = new google.maps.Marker({
                    map: originalMap,
                    position: {
                        lat: item.position.lat,
                        lng: item.position.lng,
                    },
                    icon: icon,
                });
                testArr.push(marker);

                google.maps.event.addListener(marker, "click", () => {
                    if (infoWindow) infoWindow.close();
                    infoWindow = new google.maps.InfoWindow({
                        content: `
                     <div class="info-window" style="text-align:center">
                     <h3 class="station-name">${item.name}</h3>
                     <div class="info-content">
                     <p>Available bikes: ${item.available_bikes}</p>
                     <p>Available stands: ${item.available_bike_stands}/${item.bike_stands}</p>
                     <progress value="${item.available_bikes}" max="${item.bike_stands}"></progress>
                     </div>
                     </div>
                     `,
                    });
                    infoWindow.open(originalMap, marker);
                });

                // new MarkerClusterer(originalMap, testArr, {
                //     imagePath:
                //         "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                // });
            })
        );
};
testing();
