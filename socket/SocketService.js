// socket.js
import io from 'socket.io-client';
import {mmkvStorage} from '../Utils/Modules';
const NODE_URL = 'http://13.60.169.86:3000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket.removeAllListeners();
    }
    this.socket = io(NODE_URL);
    console.log('called the connection');
    return this.socket;
  }

  joinStream(streamId) {
    if (this.socket) {
      const userId = mmkvStorage.getMap('userData').mongo_id;
      this.socket.emit('join-stream', streamId, userId);
    }
  }

  leaveStream(streamId) {
    if (this.socket) {
      this.socket.emit(
        'leave-stream',
        streamId,
        mmkvStorage.getMap('userData').mongo_id,
      );
    }
  }

  onViewerJoined(callback) {
    if (this.socket) {
      this.socket.on('viewer-joined', callback);
    }
  }

  onViewerLeft(callback) {
    if (this.socket) {
      this.socket.on('viewer-left', callback);
    }
  }

  sendComment(data) {
    if (this.socket) {
      this.socket.emit('new-comment', data);
      console.log('sendComment() : data ', data);
    }
  }

  onComment(callback) {
    if (this.socket) {
      console.log('onComment() listening...');
      this.socket.on('new-comment-received', callback);
    }
  }

  disconnect(id) {
    if (this.socket) {
      this.socket.emit('stop-stream', id);
      this.socket.disconnect();
    }
  }
  onStreamEnded(callback) {
    if (this.socket) {
      this.socket.on('stream-ended', callback);
    }
  }
}
export default new SocketService();
