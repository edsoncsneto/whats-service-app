import express from "express";
import { routerPlanos } from "./routes/planos.js";
import { routerContratos } from "./routes/contratos.js";
import { routerUsuarios } from "./routes/usuarios.js";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(express.json());
app.use(express.static("public"));
app.use(routerPlanos);
app.use(routerContratos);
app.use(routerUsuarios);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});