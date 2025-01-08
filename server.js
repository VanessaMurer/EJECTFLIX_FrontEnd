const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./backend/db.json"); // Caminho para o seu arquivo db.json
const middlewares = jsonServer.defaults();

// Middleware para garantir que os IDs sejam numéricos
server.use((req, res, next) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.id) {
      // Gera um ID numérico (pode ser ajustado para seu caso)
      const ids = Object.keys(router.db.get("posts").value()); // Ajuste "posts" para sua coleção
      const maxId = Math.max(...ids.map((id) => parseInt(id, 10)));
      data.id = maxId + 1;
    }
  }
  next();
});

// Usar os middlewares padrão
server.use(middlewares);
server.use(router);

// Iniciar o servidor
server.listen(3001, () => {
  console.log("JSON Server is running");
});
