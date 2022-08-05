import connection from "../dbStrategy/postgres.js";

async function addURL(id, url, shortUrl) {
  return connection.query(
    `INSERT INTO urls (
        "userId", 
        "url", 
        "shortUrl") 
      VALUES ($1, $2, $3);`,
    [id, url, shortUrl]
  );
}

async function getURLModified(id) {
  return connection.query(
    `SELECT id, "shortUrl", "url" FROM urls WHERE id = $1;`,
    [id]
  );
}

async function getURLById(idUrl) {
  return connection.query(`SELECT * FROM urls WHERE id = $1;`, [idUrl]);
}

async function getURLByShortURL(shortUrl) {
  return connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
    shortUrl,
  ]);
}

async function updateURL(shortUrl) {
  return connection.query(
    `UPDATE urls
          SET "visitCount"= "visitCount" + 1
          WHERE "shortUrl" = $1;
          `,
    [shortUrl]
  );
}

async function deleteURL(idUrl) {
  return connection.query(`DELETE FROM urls WHERE id = $1`, [idUrl]);
}

export const urlRepository = {
  addURL,
  getURLModified,
  getURLByShortURL,
  getURLById,
  updateURL,
  deleteURL,
};
