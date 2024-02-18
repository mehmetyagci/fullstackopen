import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const get = (lat, lon, api_key) => {
    console.log('get', lat, lon, api_key);
    const fullUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    console.log('Full URL:', fullUrl); // Log the full URL
    const request = axios.get(fullUrl);
    return request.then(response => response.data);
}

export default { get };
