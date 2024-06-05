import prismaClient from "../prisma/index";
import { CadastroRequest, LoginRequest } from "../types/types";

const jwt = require("jsonwebtoken");

export default class LoginService {
  async loginUser({ email, password }: LoginRequest) {
    try {
      validateLogin(email, password);
      const user = await findUserOnDb(email, password);
      const token = jwt.sign(
        {
          username: user.nm_usuario,
          email: user.ds_email,
        },
        "chave-secreta-token",
        { expiresIn: "1h" }
      );
      return {
        token: token,
        username: user.nm_usuario,
      };
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }

  async createCadastro({ username, email, password }: CadastroRequest) {
    try {
      validateCadastro(username, email, password);
      return await createCadastroOnDb(username, email, password);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }
}
async function findUserOnDb(email: string, password: string) {
  try {
    const user = await prismaClient.tb_cadastro.findFirstOrThrow({
      where: {
        AND: [{ ds_email: email }, { ds_senha: password }],
      },
    });
    return user;
  } catch (error) {
    if (error.name === "NotFoundError") {
      throw new Error("Usuário não encontrado");
    }
    throw new Error("Erro ao logar o usuário.");
  }
}

async function createCadastroOnDb(
  username: string,
  email: string,
  password: string
) {
  try {
    const createdUser = await prismaClient.tb_cadastro.create({
      data: {
        nm_usuario: username,
        ds_senha: password,
        ds_email: email,
      },
    });
    return {
      username: createdUser.nm_usuario,
      email: createdUser.ds_email,
    };
  } catch (error) {
    throw new Error("Erro ao criar o usuario no banco de dados.");
  }
}

function validateLogin(email: string, password) {
  if (!email) throw new Error("Email usuario é obrigatorio.");
  if (!password) throw new Error("Senha do usuario é obrigatorio.");
}

function validateCadastro(username: string, email: string, password) {
  if (!username) throw new Error("Nome do usuario é obrigatorio.");
  if (!email) throw new Error("Email usuario é obrigatorio.");
  if (!password) throw new Error("Senha do usuario é obrigatorio.");
}
