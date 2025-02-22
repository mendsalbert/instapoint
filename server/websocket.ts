import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { AudienceMetrics } from "@/types";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Client connected");

  socket.on("join-presentation", (presentationId: string) => {
    socket.join(presentationId);
  });

  socket.on("audience-metrics", (metrics: AudienceMetrics) => {
    const presentationId = Array.from(socket.rooms)[1]; // Get presentation room
    if (presentationId) {
      io.to(presentationId).emit("metrics-update", metrics);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(3001);
