// places.js
export const fetchNearbyRestaurants = async (lat, lon) => {
  const overpassUrl = "https://overpass-api.de/api/interpreter";

  // Overpass QL query to get restaurants within 5km radius
  const query = `
    [out:json];
    (
      node["amenity"="restaurant"](around:5000,${lat},${lon});
      way["amenity"="restaurant"](around:5000,${lat},${lon});
      relation["amenity"="restaurant"](around:5000,${lat},${lon});
    );
    out center;
  `;

  try {
    const res = await fetch(overpassUrl, {
      method: "POST",
      body: query,
    });

    if (!res.ok) throw new Error(`Overpass API returned ${res.status}`);

    const data = await res.json();

    // Process results
    const restaurants = data.elements
      .filter((el) => el.tags && el.tags.name)
      .map((el) => ({
        id: el.id,
        name: el.tags.name,
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        cuisine: el.tags.cuisine || "Not specified",
        address: el.tags["addr:full"] || "Address not available",
        user_ratings_total: 0, // placeholder
      }));

    return restaurants;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
