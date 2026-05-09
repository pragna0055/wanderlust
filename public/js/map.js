mapboxgl.accessToken = mapToken;

// Safe fallback in case geometry is missing
const coordinates =
  listingData.geometry && listingData.geometry.coordinates
    ? listingData.geometry.coordinates
    : [77.5946, 12.9716]; // Bengaluru fallback

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,
  zoom: 9,
});

new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listingData.location}</h4>
       <p>Exact Location provided after Booking!</p>`
    )
  )
  .addTo(map);