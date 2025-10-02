// This is a serverless function that acts as a secure proxy to the Google Maps API.
// It keeps your API key safe on the server.

exports.handler = async function (event, context) {
  // Get user's location from the query parameters sent by the React app
  const { lat, lng } = event.queryStringParameters;
  
  // WARNING: Hardcoding API keys is insecure and not recommended for production.
  // It's best to use environment variables (e.g., process.env.VITE_GOOGLE_MAPS_API_KEY).
  const apiKey = 'AIzaSyDoKqet6eee9b0U0OhgkWR2U_Ztk8-nIzI';

  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Latitude and longitude are required." }),
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not configured." }),
    };
  }
  
  // Construct the Google Places API URL
  const radius = 5000; // 5 kilometers
  const type = 'restaurant';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
        return { statusCode: 500, body: JSON.stringify({ error: data.error_message || data.status }) };
    }

    // Process the results to create a clean data structure for the frontend
    const restaurants = data.results.map(place => {
      // Construct a full photo URL if a photo reference exists
      const photoUrl = place.photos && place.photos.length > 0
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
        : 'https://placehold.co/600x400/E2E8F0/4A5568?text=No+Image'; // Placeholder

      return {
        id: place.place_id,
        name: place.name,
        rating: place.rating || 0,
        user_ratings_total: place.user_ratings_total || 0,
        address: place.vicinity,
        cuisine: place.types.find(t => t !== 'restaurant' && t !== 'food' && t !== 'point_of_interest' && t !== 'establishment') || 'Restaurant',
        photoUrl: photoUrl,
        // We'll mark the highest-rated ones as "featured" on the frontend
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(restaurants),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from Google Maps API." }),
    };
  }
};

