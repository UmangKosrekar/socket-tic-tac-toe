import { io } from "socket.io-client";
const url = process.env.REACT_APP_BASE_URL;
// const url = "https://us-central1-phoenix-corp-104.cloudfunctions.net/api";

export const socket = io(url);
