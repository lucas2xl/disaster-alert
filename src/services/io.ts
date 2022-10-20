import { io } from 'socket.io-client';
import { baseUrl } from './baseUrl';
export const socket = io(baseUrl);
