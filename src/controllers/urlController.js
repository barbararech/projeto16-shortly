import connection from "../dbStrategy/postgres.js";
import { nanoid } from "nanoid";

export async function addURL(req, res) {
  const { url } = req.body;
  const { id } = res.locals;

  const numOfChar = 8;
  const shortUrl = nanoid(numOfChar);

  try {
    await connection.query(
      `INSERT INTO urls (
          "userId", 
          "url", 
          "shortUrl") 
        VALUES ($1, $2, $3);`,
      [id, url, shortUrl]
    );

    res.status(201).send({ shortUrl });
  } catch (error) {
    return res.status(400).send(error);
  }
}
