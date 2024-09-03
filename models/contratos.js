import { dbPromise } from '../database/db.js';
import { getUsuarioById } from './usuarios.js';
import { getPlanoById } from './planos.js';

async function getContratos() {
    const db = await dbPromise;
    const contratos = await db.all(`SELECT contratos.id, usuarios.nome as nome_usuario, planos.nome as nome_plano, contratos.status
        FROM contratos 
        INNER JOIN usuarios ON contratos.usuario_id = usuarios.id 
        INNER JOIN planos ON contratos.plano_id = planos.id`
    );
    return contratos;
}

async function getContratoById(id) {
    const db = await dbPromise;
    const contrato = await db.get("SELECT * FROM contratos WHERE id = ?", [id]);
    return contrato;    
};

async function saveContrato(usuario_id, plano_id, status) {
    const db = await dbPromise;
    const usuario = await getUsuarioById(usuario_id);
    const plano = await getPlanoById(plano_id);
    if (!usuario_id) {
        throw new Error("Usuário não encontrado!");
    }
    if (!plano_id) {
        throw new Error("Plano não encontrado!");
    }
    if (!["inativo", "ativo", "cancelado"].includes(status)) {
        throw new Error("Status inválido para atualização do contrato!");
    }
    await db.run("INSERT INTO contratos (usuario_id, plano_id, status) VALUES (?,?,?)", [usuario_id, plano_id, status]);
};

async function updateContrato(id, novoPlanoId, novoUsuarioId, novoStatus) {
    const db = await dbPromise;
    const novoUsuario = await getUsuarioById(novoUsuarioId);
    const novoPlano = await getPlanoById(novoPlanoId);

    if (!novoUsuario) {
        throw new Error("Novo usuário não encontrado!");
    }
    if (!novoPlano) {
        throw new Error("Novo plano não encontrado!");
    }
    if (!["inativo", "ativo", "cancelado"].includes(novoStatus)) {
        throw new Error("Novo status inválido para atualização do contrato!");
    }

    await db.run(
        "UPDATE contratos SET plano_id = ?, usuario_id = ?, status = ? WHERE id = ?", [novoPlanoId, novoUsuarioId, novoStatus, id]
    );
}

async function deleteContrato(id) {
    const db = await dbPromise;
    await db.run("DELETE FROM contratos WHERE id = ?", [id]);
}

export { getContratos, getContratoById, saveContrato, updateContrato, deleteContrato };