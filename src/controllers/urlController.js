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

export async function openURL(req, res) {
  const { shortUrl } = req.params;

  try {
    const { rows: url } = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shortUrl]
    );

    if (url.length === 0) {
      return res.sendStatus(404);
    }

    const increment = url[0].visitCount + 1;

    await connection.query(
      `UPDATE urls
            SET "visitCount"=$1`,
      [increment]
    );

    return res.redirect(url[0].url);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function deleteURL(req, res) {
  const idUser = res.locals.id;
  const idUrl = req.params.id;
  console.log(idUser);
  console.log(idUrl);
  try {
    const { rows: url } = await connection.query(
      `SELECT * FROM urls WHERE id = $1;`,
      [idUrl]
    );
    console.log(url[0].userId);
    if (url.length === 0) {
      return res.sendStatus(404);
    }

    if (url[0].userId !== idUser) {
      return res.sendStatus(401);
    }

    await connection.query(`DELETE FROM urls WHERE id = $1`, [idUrl]);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).send(error);
  }
}
