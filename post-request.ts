// deno run --allow-net post-request.ts

const url = "http://localhost:8080/send";
const data = { message: "Hello WebSocket clients" };

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

const responseData = await response.json();
console.log("Response from server:", responseData);
