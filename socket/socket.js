import io from 'socket.io-client';

// const socket = io('http://13.48.147.251:3000');
const socket = io('http://38.0.101.76:3000');
export const initSocket = updateLocation => {
  socket.on('connect', () => {
    console.log('Connected to socket server');
    // socket.emit('joinRoom', 2);
    // startListeningForLocationUpdates(updateLocation);
  });
};
const sendLocation = data => {
  // Emit the location to the server
  console.log('Sending location:', data);
  socket.emit('sendLocation', data);
};

const startListeningForLocationUpdates = updateLocation => {
  // Listen for location updates from the server
  // socket.on('locationUpdate', location => {
  //   console.log('Received location update:', location);
  //   updateLocation(prev => {
  //     if (prev.length > 0) {
  //       const temp = [...prev];
  //       const index = temp.findIndex(item => item.riderId === location.riderId);
  //       if (index) {
  //         temp[index] = location;
  //         return;
  //       } else return [...prev, location];
  //     } else return [...prev, location];
  //   });
  //   // Do something with the received location data here
  // });
};

export {sendLocation, startListeningForLocationUpdates, socket};
