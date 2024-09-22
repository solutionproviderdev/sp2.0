// socketService.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = () => {
	socket = io('http://localhost:5000', {
		path: '/socket.io',
		reconnectionDelay: 1000,
		reconnection: true,
		reconnectionAttempts: 10,
		transports: ['websocket'],
		agent: false,
		upgrade: false,
		rejectUnauthorized: false,
	});

	return socket;
};

export const getSocket = () => connectSocket();
