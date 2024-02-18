import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const get = (lat, lon) => {
    console.log('get', lat, lon);
    const api_key = import.meta.env.VITE_SOME_KEY; // Move inside the function
    const fullUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    console.log('Full URL:', fullUrl); // Log the full URL
    const request = axios.get(fullUrl);
    return request.then(response => response.data);
}

export default { get };
