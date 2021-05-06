import { ajaxPromise } from '/jquery_php/module/utils/utils.js';

function initMap() {
    var markers = [];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(40.891859, -3.695447),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    
    ajaxPromise('/jquery_php/module/aboutus/controller/controller_aboutus.php?op=maps', 'GET', 'JSON')
        .then(function (data) {
            console.log(data);

            data.forEach(shop => {
                var newMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        shop.shopLat,
                        shop.shopLon),
                    map: map,
                    title:
                        shop.shopName
                });
                var content = `<div class='col-5' style='float:left;'><img src='/jquery_php/view/img/aboutus/shops/`+shop.shopImg+`'></div>
                <div class='col-7' style='float:right; padding: 10px;'>
                    <span style='font-size: 21px; font-weight: bold;'>`+shop.shopName+`</span><br/>
                    <br/><span>`+shop.shopAddress+`</span><br/>
                    <span>`+shop.shopPost+`, `+shop.shopCity+`</span><br/>
                    <span>`+shop.shopState+`, `+shop.shopCountry+`</span><br/>
                    <br/><span style='font-size: 10px;'>`+shop.shopDesc+`</span><br/>
                    </div>`;
                google.maps.event.addListener(newMarker, 'click', (function (newMarker, shop) {
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, newMarker);
                    }
                })(newMarker, shop));
                markers.push(newMarker);
            });

        }).catch(function (err) {
            console.error(err)
        });
}

function getAPIKey(){

    if (document.getElementById("map") != null) {
        $.ajax({
            url: 'config.json',
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                var script = document.createElement('script');
                const GEOAPI_KEY = data.API_KEY.Geolocation;
                script.src = "https://maps.googleapis.com/maps/api/js?key=" + GEOAPI_KEY + "&callback=initMap";
                script.async;
                script.defer;
                document.getElementsByTagName('script')[0].parentNode.appendChild(script);
            }
        })
        
    }

}

$(document).ready(function () {
    window.initMap = initMap;
    getAPIKey();
})