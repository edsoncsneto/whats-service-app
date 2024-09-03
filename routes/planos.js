import {Router} from 'express';
import {getPlanoByName, getPlanos, savePlano, getPlanoById, deletePlano, updatePlano} from '../models/planos.js';

const routerPlanos = Router();

routerPlanos.get("/api/planos", async (req, res) => {
    try{
        const planos = await getPlanos();
        return res.status(200).json(planos);
    } catch (e) {
        return res.status(400).json({message: `Erro ao carregar os contratos: ${e.message}`});
    }
});

routerPlanos.post("/api/planos", async (req, res) => {
    try {
        const {nome, descricao, preco} = req.body;
        const plano = await getPlanoByName(nome);
        if (plano) {
            return res.status(400).json({ message: "Já há um plano cadastrado com esse nome!" });
        } else {
            await savePlano(nome, descricao, preco);
            return res.status(201).json({message: "Plano cadastrado com sucesso"})
        }
    } catch (e){
        return res.status(400).json({ message: `Não foi possível cadastrar o plano: ${e.message}` });
    }
});

routerPlanos.get("/api/planos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const plano = await getPlanoById(id);
        
        if (plano) {
            return res.status(200).json(plano);
        } else {
            return res.status(404).json({ message: "Plano não encontrado!" });
        }
    } catch (e) {
        return res.status(400).json({ message: `Erro ao tentar recuperar o plano: ${e.message}`});
    }
});

routerPlanos.delete("/api/planos/:id", async (req, res) => {
    const { id } = req.params;
    const plano = await getPlanoById(id);

    try {
        if (plano) {
            await deletePlano(id);
            return res.status(200).json({ message: "Plano deletado com sucesso!" });
        } else {
            return res.status(404).json({ message: "Plano não encontrado!" });
        }
    } catch (e) {
        return res.status(400).json({ message: `Erro ao deletar plano: ${e.message}` });
    }

});

routerPlanos.put("/api/planos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    try{
        const planoExistente = await getPlanoById(id);
        if (planoExistente) {
            await updatePlano(id, nome, descricao, preco);
            return res.status(200).json({ message: "Plano atualizado com sucesso!" });
        } else {
            return res.status(404).json({ message: "Plano não encontrado!" });
        }

    } catch (e) {
        return res.status(400).json({ message: `Não foi possível atualizar o plano: ${e.message}` });
    }

});

export {routerPlanos};