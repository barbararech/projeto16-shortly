import connection from "../dbStrategy/postgres.js";

async function addUser(name, email, password) {
  return connection.query(
    `INSERT INTO users (
            name, 
            email, 
            password) 
          VALUES ($1, $2, $3);`,
    [name, email, password]
  );
}

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function getUserProfile(id) {
  return connection.query(
    `
        SELECT 
          users.id, 
          users.name, 
          users."visitCount",
          json_agg(json_build_object( 
              'id', urls.id, 
              'shortUrl', urls."shortUrl", 
              'url', urls."url", 
              'visitCount', urls."visitCount")
            ORDER BY urls.id) 
          FILTER (WHERE urls.id IS NOT NULL)
          AS "shortenedUrls"
        FROM users
        LEFT JOIN urls 
        ON urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id;
        `,
    [id]
  );
}

async function updateUser(userId) {
  return connection.query(
    `UPDATE users
            SET "visitCount"="visitCount" + 1
            WHERE id = $1`,
    [userId]
  );
}

async function getRanking() {
  return connection.query(
    `
    SELECT 
      users.id, 
      users.name, 
      COUNT ("userId")::int AS "linksCount",
      users."visitCount"
    FROM users
    LEFT JOIN urls 
    ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `
  );
}

export const userRepository = {
  addUser,
  getUserByEmail,
  getUserProfile,
  getRanking,
  updateUser,
};
