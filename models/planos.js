import { dbPromise } from '../database/db.js';

async function getPlanos() {
    const db = await dbPromise;
    const planos = await db.all("SELECT * FROM planos");
    return planos;
}

async function getPlanoById(id) {
    const db = await dbPromise;
    const planos = await db.get("SELECT * FROM planos WHERE id = ?", [id]);
    return planos;
}

async function getPlanoByName(name) {
    const db = await dbPromise;
    const plano = await db.get("SELECT * FROM planos WHERE nome = ?", [name]);
    return plano;
}

async function savePlano(nome, descricao, preco) {
    const db = await dbPromise;
    await db.run("INSERT INTO planos (nome, descricao, preco) VALUES (?,?,?)", [nome, descricao, preco]);
}

async function updatePlano(id, novoNome, novaDescricao, novoPreco) {
    const db = await dbPromise;
    await db.run(
        "UPDATE planos SET nome = ?, descricao = ?, preco = ? WHERE id = ?",
        [novoNome, novaDescricao, novoPreco, id]);  
}

async function deletePlano(id) {
    const db = await dbPromise;
    await db.run("DELETE FROM planos WHERE id = ?", [id]);
}

export { getPlanos, getPlanoById, getPlanoByName, savePlano, updatePlano, deletePlano };
