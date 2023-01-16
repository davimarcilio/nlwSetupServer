import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
const app = Fastify();
const prisma = new PrismaClient();

app.get("/", async () => {
  const habits = await prisma.habit.findMany();
  return habits;
  //   return "hello world";
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("server listening on port 3333");
  });
