import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta que recibe los datos del frontend y reenvía a Redmine
app.post('/projects/:project/issues.json', async (req, res) => {
  const project = req.params.project;
  const issueData = req.body.issue;

  try {
    const redmineResponse = await fetch('http://localhost:3000/projects/gestion-de-tickets/issues.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Redmine-API-Key': '135b7a5aafeb476f0bce47c34ad29ce04663b77f'
      },
      body: JSON.stringify({ issue: issueData })
    });

    const data = await redmineResponse.json();
    res.status(redmineResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con Redmine', detalles: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});