import {decode} from '@mapbox/polyline'; //please install this package before running!
import {Linking, Alert} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {logger, consoleTransport} from 'react-native-logs';
const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

export var log = logger.createLogger(defaultConfig);
export const mmkvStorage = new MMKVLoader().initialize();

export function getTimeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const elapsed = now - date;

  if (elapsed < 1000) {
    return 'Just now';
  } else if (elapsed < 60000) {
    const seconds = Math.floor(elapsed / 1000);
    return seconds + (seconds === 1 ? ' sec ago' : ' secs ago');
  } else if (elapsed < 3600000) {
    const minutes = Math.floor(elapsed / 60000);
    return minutes + (minutes === 1 ? ' min ago' : ' mins ago');
  } else if (elapsed < 86400000) {
    const hours = Math.floor(elapsed / 3600000);
    return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  } else if (elapsed < 604800000) {
    const days = Math.floor(elapsed / 86400000);
    return days + (days === 1 ? ' day ago' : ' days ago');
  } else if (elapsed < 2592000000) {
    const weeks = Math.floor(elapsed / 604800000);
    return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
  } else if (elapsed < 31536000000) {
    const months = Math.floor(elapsed / 2592000000);
    return months + (months === 1 ? ' month ago' : ' months ago');
  } else {
    const years = Math.floor(elapsed / 31536000000);
    return years + (years === 1 ? ' year ago' : ' years ago');
  }
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert latitude difference to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert longitude difference to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return `${distance.toFixed(0)} KM`;
}

// Coordinates
const lat1 = 33.294197;
const lon1 = -111.887207;
const lat2 = 32.713268;
const lon2 = -117.071838;

const distance = calculateDistance(lat1, lon1, lat2, lon2);
console.log(`Distance: ${distance} km`);
export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDirections = async (startLoc, destinationLoc) => {
  try {
    console.log('GetDirections', startLoc, destinationLoc);
    const KEY = 'AIzaSyDJUAXenD6R8xst8Jand_-_Z8lLsmT_3SA'; //put your API key here.
    //otherwise, you'll have an 'unauthorized' error.
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`,
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    console.log('Coords: ', coords);
    return coords;
  } catch (error) {
    console.log('Get Directions Error: ', error);
    throw error;
  }
};

export const openDialer = phoneNumber => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log(`Phone dialing is not supported on this device`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(error => console.log(`An error occurred: ${error}`));
};

export const showLocationEnabler = () => {
  Alert.alert(
    'Turn On Location',
    'To provide you with the best experience, please enable location services.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Enable',
        onPress: () => {
          Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
        },
      },
    ],
  );
};

// export const getFormattedAddressFromCoordinates = async (
//   coordinate,
//   apiKey = 'AIzaSyAcFsaT_Cnrvb7Vy9CulEQB1walrDYFiTE',
// ) => {
//   try {
//     const {latitude, longitude} = coordinate;

//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
//     );

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();

//     if (data.status === 'OK' && data.results.length > 0) {
//       // Extract the formatted address from the response
//       const formattedAddress = data.results[0].formatted_address;
//       console.log('Formatted address:', formattedAddress);
//       return formattedAddress;
//     } else {
//       return 'Address not found';
//     }
//   } catch (error) {
//     console.error('Error fetching address:', error);
//     return 'Error fetching address';
//   }
// };
export const getFormattedAddressFromCoordinates = async (
  coordinate,
  apiKey = 'AIzaSyDJUAXenD6R8xst8Jand_-_Z8lLsmT_3SA',
) => {
  try {
    const {latitude, longitude} = coordinate;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      // Extract address components from the response
      const result = data.results[0];
      const addressComponents = result.address_components;
      console.log('hasnain:', result);
      // Extract relevant information (country, city, postal code)
      let country = '';
      let city = '';
      let postalCode = '';

      for (const component of addressComponents) {
        if (component.types.includes('country')) {
          country = component.long_name;
        } else if (component.types.includes('locality')) {
          city = component.long_name;
        } else if (component.types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      }

      // Extract the formatted address from the response
      const formattedAddress = result.formatted_address;

      return {
        formattedAddress,
        country,
        city,
        postalCode,
      };
    } else {
      return {
        formattedAddress: 'Address not found',
        country: '',
        city: '',
        postalCode: '',
      };
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return {
      formattedAddress: 'Error fetching address',
      country: '',
      city: '',
      postalCode: '',
    };
  }
};

export const geocodeAddress = async (
  address,
  apiKey = 'AIzaSyAcFsaT_Cnrvb7Vy9CulEQB1walrDYFiTE',
) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      // Extract the latitude and longitude from the response
      const location = data.results[0].geometry.location;
      const coordinates = {
        latitude: location.lat,
        longitude: location.lng,
      };
      return coordinates;
    } else {
      return null; // Address not found or other error
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null; // Error occurred while geocoding
  }
};

export function convertItemListToJSON(itemList) {
  console.log('itemList', itemList);
  const result = {};

  itemList.forEach(item => {
    result[item.id] = parseInt(item.quantity);
  });

  return result;
}

export function dateTimeFromLong(inputDate) {
  const optionsDate = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const date = new Date(inputDate);
  const formattedDate = date.toLocaleString('en-US', optionsDate);
  const formattedTime = date.toLocaleString('en-US', optionsTime);

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function separateDateAndTime(inputDateTime) {
  const [datePart, timePart] = inputDateTime.split(' ');

  const optionsDate = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Date(datePart).toLocaleString('en-US', optionsDate);
  const formattedTime = new Date(`2000-01-01 ${timePart}`).toLocaleString(
    'en-US',
    optionsTime,
  );

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function formatNumber(value) {
  if (!value || value == '') {
    return 0;
  }
  if (value < 1000) {
    return value.toString();
  } else if (value < 1000000) {
    return (value / 1000).toFixed(1) + 'K';
  } else {
    return (value / 1000000).toFixed(1) + 'M';
  }
}

export function formatTimeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const timeIntervals = [
    {label: 'year', seconds: 365 * 24 * 60 * 60},
    {label: 'month', seconds: 30 * 24 * 60 * 60},
    {label: 'week', seconds: 7 * 24 * 60 * 60},
    {label: 'day', seconds: 24 * 60 * 60},
    {label: 'hour', seconds: 60 * 60},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 1},
  ];

  for (const interval of timeIntervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now'; // When the difference is less than a second
}
