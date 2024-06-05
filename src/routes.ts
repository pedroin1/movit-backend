import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import LoginController from "./controller/LoginController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const loginController = new LoginController();

  fastify.post(
    "/login",
    async (request: FastifyRequest, response: FastifyReply) => {
      return loginController.login(request, response);
    }
  );

  fastify.post(
    "/cadastrar",
    async (request: FastifyRequest, response: FastifyReply) => {
      return loginController.cadastrar(request, response);
    }
  );
}
