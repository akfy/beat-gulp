;(function () {
    let myMap;

    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [56.011129, 92.857413],
            zoom: 13,
            controls: []
        });

        const coords = [
            [56.021129, 92.807413],
            [56.001129, 92.817413],
            [56.031129, 92.827413],
            [56.041129, 92.837413]

        ];

        const myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: "./img/marker.svg",
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        })
        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        });
        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable('scrollZoom');


    }

    ymaps.ready(init);

})();