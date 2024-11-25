export const BASE_URL = 'http://192.168.39.248:3000/';

export const NodePostRequest = async (endpoint, data, json = false) => {
  try {
    console.log('data', data, 'endpoint :', BASE_URL + endpoint);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': json ? 'application/json' : 'multipart/form-data',
      },
      body: json ? JSON.stringify(data) : data,
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

export const NodeGetRequest = async endpoint => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

export const Uri = url => {
  return {uri: BASE_URL + url};
};
