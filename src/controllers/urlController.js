import { urlRepository } from "../repositories/urlRepositories.js";
import { userRepository } from "../repositories/userRepositories.js";
import { nanoid } from "nanoid";

export async function addURL(req, res) {
  const { url } = req.body;
  const { id } = res.locals;

  const numOfChar = 8;
  const shortUrl = nanoid(numOfChar);

  try {
    await urlRepository.addURL(id, url, shortUrl);

    return res.status(201).send({ shortUrl });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getURL(req, res) {
  const { id } = req.params;

  try {
    const { rows: url } = await urlRepository.getURLModified(id);

    if (url.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).send(url[0]);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function openURL(req, res) {
  const { shortUrl } = req.params;

  try {
    const { rows: url } = await urlRepository.getURLByShortURL(shortUrl);
    const userId = url[0].userId;

    if (url.length === 0) {
      return res.sendStatus(404);
    }

    await urlRepository.updateURL(shortUrl);

    await userRepository.updateUser(userId);

    return res.redirect(url[0].url);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteURL(req, res) {
  const idUser = res.locals.id;
  const idUrl = req.params.id;

  try {
    const { rows: url } = await urlRepository.getURLById(idUrl);

    if (url.length === 0) {
      return res.sendStatus(404);
    }

    if (url[0].userId !== idUser) {
      return res.sendStatus(401);
    }

    await urlRepository.deleteURL(idUrl);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
}
