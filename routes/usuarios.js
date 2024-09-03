import { Router } from 'express';
import { getUsuarios, getUsuarioById, saveUsuario, getUsuarioByEmail, getAllEmailsExcludingId, getLogin, updateUsuario, deleteUsuario } from '../models/usuarios.js';

const routerUsuarios = Router();

routerUsuarios.post('/api/usuarios/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        //verificando se tem o email
        const usuario = await getUsuarioByEmail(email);
        if (usuario) {
            const senhaVerificar = await getLogin(email);
            if (senhaVerificar.senha === senha) {
                return res.status(200).json({ message: 'Login bem-sucedido!' });
            } else {
                return res.status(401).json({ message: 'Senha incorreta.' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }
    } catch (e) {
        return res.status(500).json({ message: `Erro interno do servidor. ${e.message}` });
    }
});

routerUsuarios.get("/api/usuarios", async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        return res.status(200).json(usuarios);
    } catch (e) {
        return res.status(500).json({ message: `Erro ao carregar os usuários: ${e.message}` });
    }
});

routerUsuarios.post("/api/usuarios", async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;
        const usuarioExistente = await getUsuarioByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ message: "Já há um usuário cadastrado com esse email!" });
        } else {
            await saveUsuario(nome, email, senha, tipo);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Não foi possível cadastrar o usuário: ${e.message}` });
    }
});

routerUsuarios.get("/api/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUsuarioById(id);

        if (usuario) {
            return res.status(200).json(usuario);
        } else {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Erro ao tentar recuperar o usuário: ${e.message}` });
    }
});

routerUsuarios.delete("/api/usuarios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await getUsuarioById(id);
        if (usuario) {
            await deleteUsuario(id);
            return res.status(200).json({ message: "Usuário deletado com sucesso!" });
        } else {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Erro ao deletar usuário: ${e.message}` });
    }
});

routerUsuarios.put("/api/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;

    try {
        const usuarioExistente = await getUsuarioById(id);
        const emails = await getAllEmailsExcludingId(id);
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
        if (!["cliente", "administrador"].includes(tipo)) {
            return res.status(400).json({message: "Tipo de usuário inválido para atualização"});
        }
        if (emails.includes(email)) {
            return res.status(400).json({message: "Não foi possível atualizar. Email já encontrado num outro registro!"});
        }
        await updateUsuario(id, nome, email, senha, tipo);
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
        
    } catch (e) {
        return res.status(500).json({ message: `Não foi possível atualizar o usuário: ${e.message}` });
    }
});

export { routerUsuarios };
