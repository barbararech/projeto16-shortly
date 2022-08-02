import connection from "../dbStrategy/postgres.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  const passwordCrypt = bcrypt.hashSync(req.body.password, 10);
  const user = { ...req.body, password: passwordCrypt };
  const { name, email, password } = user;

  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send("As senhas não coincidem!");
    }

    const { rows: userExist } = await connection.query(
      "SELECT * FROM users WHERE email = $1;",
      [user.email]
    );

    if (userExist.length !== 0) {
      return res.sendStatus(409);
    }

    await connection.query(
      `INSERT INTO users (
              name, 
              email, 
              password) 
            VALUES ($1, $2, $3);`,
      [name, email, password]
    );

    res.sendStatus(201);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function signIn(req, res) {

}
