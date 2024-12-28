import { io } from 'socket.io-client';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BASE_URL + " it is base url");
export const initSocket = async() => {
    const options = {
        'force new connection': true,
        'reconnectionAttempts': 'Infinity',
        'timeout': 1000, // 10 seconds
        'transports': ['websocket', 'polling'],
    };
    console.log(options);
    return io(BASE_URL, options)
}