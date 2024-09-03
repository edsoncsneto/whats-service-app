import {Router} from 'express';

import {getContratos, getContratoById, saveContrato, updateContrato, deleteContrato} from '../models/contratos.js';

const routerContratos = Router();

routerContratos.get("/api/contratos", async (req, res) => {
    try {
        const contratos = await getContratos();
        return res.status(200).json(contratos);
    } catch (e) {
        return res.status(400).json({message: `Erro ao carregar os contratos: ${e.message}`});
    }
});

routerContratos.post("/api/contratos", async (req, res) => {
    try{
        const {usuario_id, plano_id, status} = req.body;
        await saveContrato(usuario_id, plano_id, status);
        return res.status(201).json({message: "Contrato cadastrado com sucesso"});

    } catch (e) {
        return res.status(400).json({ message: `Não foi possível cadastrar o contrato: ${e.message}` });
    }
});

routerContratos.get("/api/contratos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const contrato = await getContratoById(id);
        
        if (contrato) {
            return res.status(200).json(contrato);
        } else {
            return res.status(404).json({ message: "Contrato não encontrado!" });
        }
    } catch (e) {
        return res.status(400).json({ message: `Erro ao tentar recuperar o contrato: ${e.message}`});
    }
});

routerContratos.delete("/api/contratos/:id", async (req, res) => {
    const { id } = req.params;
    const contrato = await getContratoById(id);

    try {
        if (contrato) {
            await deleteContrato(id);
            return res.status(200).json({ message: "Contrato deletado com sucesso!" });
        } else {
            return res.status(404).json({ message: "Contrato não encontrado!" });
        }

    } catch (e) {
        return res.status(400).json({ message: `Erro ao deletar contrato: ${e.message}` });
    }
});

routerContratos.put("/api/contratos/:id", async (req, res) => {
    const { id } = req.params;
    const { usuario_id, plano_id, status } = req.body;

    try {
        const contratoExistente = await getContratoById(id);
        
        if (!contratoExistente) {
            return res.status(404).json({ message: "Contrato não encontrado!" });
        }

        await updateContrato(id, plano_id, usuario_id, status);
        return res.status(200).json({ message: "Contrato atualizado com sucesso!" });
        
    } catch (e) {
        return res.status(400).json({ message: `Não foi possível atualizar o contrato: ${e.message}` });
    }
});


export {routerContratos};