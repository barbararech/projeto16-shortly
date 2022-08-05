import { userRepository } from "../repositories/userRepositories.js";

export async function getUser(req, res) {
  const { id } = res.locals;

  try {
    const { rows: user } = await userRepository.getUserProfile(id);

    if (user.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).send(user[0]);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await userRepository.getRanking();

    return res.status(200).send(ranking);
  } catch (error) {
    return res.status(500).send(error);
  }
}
