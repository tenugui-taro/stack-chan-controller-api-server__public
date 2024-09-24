// deno run --allow-net post-update-expression.ts

const url = "http://localhost:8080/update-expression";
const data = { expression: "happy" };

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

const responseData = await response.json();
console.log("Response from server:", responseData);
