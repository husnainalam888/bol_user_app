export const BASE_URL =
  'http://multivendorv3.freelanceworking.online/apis/public/api/customer/';
// api.js

export const IMAGE_B_URL =
  // 'https://multivendorv3.freelanceworkxyz.site/public/images/';
  'http://multivendorv3.freelanceworking.online/apis/public/images/';
// Function to make a POST request
export const postRequest = async (endpoint, data, json = false) => {
  try {
    console.log('data', data, 'endpoint :', BASE_URL + endpoint);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': json ? 'application/json' : 'multipart/form-data',
      },
      body: data,
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

// Function to make a GET request
export const getRequest = async endpoint => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

//  const handlePostRequest = async () => {
//    const data = {key1: 'value1', key2: 'value2'};
//    try {
//      const response = await postRequest('post-endpoint', data);
//      setPostData(response);
//    } catch (error) {
//      console.error('Error making POST request:', error);
//    }
//  };

//  const handleGetRequest = async () => {
//    const params = {param1: 'value1', param2: 'value2'};
//    try {
//      const response = await getRequest('get-endpoint', params);
//      setGetData(response);
//    } catch (error) {
//      console.error('Error making GET request:', error);
//    }
//  };
export const getCustomerRequest = async endpoint => {
  try {
    const response = await fetch(
      `${'https://multivendorv3.freelanceworking.online/apis/public/api/customer/'}${endpoint}`,
    );

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};
