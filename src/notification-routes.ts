import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";
const publicKey =
  "BPrHkBcKAjs9CQNc5saB9G9GoO5rj7uvlRnDRUyPfe9MRz2PdT7m0Kkfd1h9ty1WFsjCtboVmmTdLmO6Yi6e-fA";
const privateKey = "QHUnwSGqyriSnHWCO9LD4QJGdKUSX72IX4vsCUErtvQ";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });
  app.post("/push/register", (request, reply) => {
    return reply.status(201).send();
  });
  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({ p256dh: z.string(), auth: z.string() }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    WebPush.sendNotification(subscription, "HELLO DO BACKEND");

    return reply.status(201).send();
  });
}
