const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const findRepository = repositories.find(repository => repository.id === id);

  if (!findRepository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  if (updatedRepository.title) {
    findRepository.title = updatedRepository.title;
  }
  if (updatedRepository.url) {
    findRepository.url = updatedRepository.url;
  }
  if (updatedRepository.techs) {
    findRepository.techs = updatedRepository.techs;
  }

  return response.json(findRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.find(repository => repository.id === id);

  if (!findRepository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(1, findRepository);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes += 1;
  const likes = ++repositories[repositoryIndex].likes;

  return response.json(likes);
});


module.exports = app;
