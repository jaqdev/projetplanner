const BASE_URL = "http://localhost:3000/api/v1";

export async function apiFetch(endpoint, options = {}, errorField = null) {

    console.log("Fetching:", BASE_URL + endpoint, options);
    
    let res = await fetch(BASE_URL + endpoint, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
    let data = await res.json();

      return data;
};