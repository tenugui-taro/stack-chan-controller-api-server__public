// deno run --allow-net server.ts

let sockets: WebSocket[] = [];

function handleWebSocket(request: Request) {
  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.onopen = () => {
    console.log("CONNECTED");
    sockets.push(socket);
  };

  socket.onmessage = (event) => {
    console.log(`RECEIVED: ${event.data}`);
  };

  socket.onclose = () => {
    console.log("DISCONNECTED");
    sockets = sockets.filter((s) => s !== socket);
  };

  socket.onerror = (error) => console.error("ERROR:", error);

  return response;
}

async function handlePostRequest(request: Request) {
  const data = await request.json();

  // Send data to all WebSocket clients
  for (const socket of sockets) {
    socket.send(JSON.stringify(data));
  }

  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

async function handleUpdateExpressionRequest(request: Request) {
  const data = await request.json();

  // Send expression update to all WebSocket clients
  const message = { type: "update-expression", data };
  for (const socket of sockets) {
    socket.send(JSON.stringify(message));
  }

  return new Response(JSON.stringify({ status: "expression updated" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function handleRequest(request: Request) {
  if (request.headers.get("upgrade") === "websocket") {
    return handleWebSocket(request);
  } else if (
    request.method === "POST" &&
    request.url === "http://localhost:8080/send"
  ) {
    return handlePostRequest(request);
  } else if (
    request.method === "POST" &&
    request.url === "http://localhost:8080/update-expression"
  ) {
    return handleUpdateExpressionRequest(request);
  } else {
    return new Response("Hello, Deno!", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

Deno.serve({
  port: 8080,
  handler: handleRequest,
});
