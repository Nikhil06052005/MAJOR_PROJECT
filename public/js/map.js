
      maptilersdk.config.apiKey = mapToken;

      const map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.STREETS,
        center: [77.4015, 28.6242],// starting position [lng, lat]
        zoom: 11, // starting zoom
      });
