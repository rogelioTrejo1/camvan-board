const socket = new WebSocket("ws://localhost:35729");
socket.addEventListener("message", (event) => (event.data === "reload") && location.reload());