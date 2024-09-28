// Usage: deno run --allow-net post-update-pose.ts

function randomBetween(min: number, max: number): number {
  return min + (max - min) * Math.random();
}
const x = randomBetween(0.4, 1.0);
const y = randomBetween(-0.4, 0.4);
const z = randomBetween(-0.02, 0.2);

const url = "http://localhost:8080/update-pose";
const data = { pose: { x, y, z } };

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

const responseData = await response.json();
console.log("Response from server:", responseData);
