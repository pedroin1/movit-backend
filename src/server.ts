import cors from "@fastify/cors";
import Fastify from "fastify";
import { routes } from "./routes";

const app = Fastify({ logger: true });

const start = async () => {
  await app.register(routes);
  app.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], //aqui configuro os metodos
  });
  try {
    await app.listen({ port: 3333 });
  } catch (error) {
    process.exit(1);
  }
};

start();
