import { io } from "socket.io-client";
const url = "http://localhost:5001/play"
// const url = "https://us-central1-phoenix-corp-104.cloudfunctions.net/api";

export const socket = io(url);
