import { FastifyReply, FastifyRequest } from "fastify";
import LoginService from "../service/LoginService";
import { CadastroRequest, LoginRequest } from "../types/types";

export default class LoginController {
  async login(request: FastifyRequest, response: FastifyReply) {
    const loginService = new LoginService();
    const requestBody = request.body as LoginRequest;
    try {
      response.status(200).send(await loginService.loginUser(requestBody));
    } catch (error: unknown) {
      response.status(403).send({ error: (error as Error).message });
    }
  }
  async cadastrar(request: FastifyRequest, response: FastifyReply) {
    const loginService = new LoginService();
    const requestBody = request.body as CadastroRequest;
    try {
      response.status(200).send(await loginService.createCadastro(requestBody));
    } catch (error: unknown) {
      response.status(403).send({ error: (error as Error).message });
    }
  }
}
