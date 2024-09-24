// deno run --allow-net websocket-client.ts

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("WebSocket connection opened");
  socket.send("Hello Server");
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
