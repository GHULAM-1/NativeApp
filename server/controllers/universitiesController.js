const fetch = require('node-fetch');

const getNearbyUniversities = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const left = parseFloat(longitude) - 0.1;
  const right = parseFloat(longitude) + 0.1;
  const top = parseFloat(latitude) + 0.1;
  const bottom = parseFloat(latitude) - 0.1; 

  const boundingBox = `${left},${top},${right},${bottom}`;
  const url = `https://nominatim.openstreetmap.org/search?q=university&format=json&addressdetails=1&bounded=1&viewbox=${boundingBox}&limit=10`;

  try {
    console.log('Nominatim API URL:', url); // Debugging

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Nominatim API Response:', response.status, response.statusText);
      throw new Error('Failed to fetch data from Nominatim API');
    }

    const data = await response.json();
    console.log(data)
    if (data.length === 0) {
      console.warn('No universities found');
    }

    res.status(200).json(data); 
  } catch (error) {
    console.error('Error fetching data from Nominatim API:', error);
    res.status(500).json({ error: 'Error fetching data from Nominatim API' });
  }
};

module.exports = {
  getNearbyUniversities,
};
