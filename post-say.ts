// deno run --allow-net post-say.ts

const url = "http://localhost:8080/say";
const data = { text: "ありがとう、またねーー" };

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

const responseData = await response.json();
console.log("Response from server:", responseData);
