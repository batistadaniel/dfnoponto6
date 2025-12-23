import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); 

app.get("/api/geojson", async (req, res) => {
  const url = "https://geoserver.semob.df.gov.br/geoserver/semob/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=semob%3A%C3%9Altima%20posi%C3%A7%C3%A3o%20da%20frota&outputFormat=application%2Fjson";
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do GeoServer" });
  }
});

// EXPORTAR O APP: Isso é fundamental para a Vercel
export default app;