// deno run --allow-net post-update-expression.ts

const EMOTIONS = ["HAPPY", "ANGRY", "SAD", "SLEEPY"];

const url = "http://localhost:8080/update-expression";
const data = { expression: EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)] };

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

const responseData = await response.json();
console.log("Response from server:", responseData);
