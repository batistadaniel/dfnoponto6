import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import https from "https"; // 1. Importe o módulo https

const app = express();
app.use(cors()); 

// 2. Crie um agente que ignora a rejeição de certificados não autorizados
const agent = new https.Agent({
  rejectUnauthorized: false
});

app.get("/api/geojson", async (req, res) => {
  const url = "https://geoserver.semob.df.gov.br/geoserver/semob/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=semob%3A%C3%9Altima%20posi%C3%A7%C3%A3o%20da%20frota&outputFormat=application%2Fjson";
  
  try {
    // 3. Passe o agente na requisição
    const response = await fetch(url, { agent });
    
    if (!response.ok) {
        throw new Error(`Erro no GeoServer: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    // 4. Melhore o log para você ver o erro real no painel da Vercel
    console.error("DETALHE DO ERRO:", error.message);
    res.status(500).json({ 
        error: "Erro ao buscar dados do GeoServer",
        details: error.message 
    });
  }
});

export default app;