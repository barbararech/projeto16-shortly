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

    return res.status(201).send({ shortUrl });
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getURL(req, res) {
  const { id } = req.params;

  try {
    const { rows: url } = await connection.query(
      `SELECT id, "shortUrl", "url" FROM urls WHERE id = $1;`,
      [id]
    );

    if (url.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).send(url);
  } catch (error) {
    return res.status(400).send(error);
  }
}
