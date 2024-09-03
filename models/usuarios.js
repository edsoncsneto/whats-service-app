import {dbPromise} from '../database/db.js';

async function getUsuarios() {
    const db = await dbPromise;
    const usuarios = await db.all("SELECT * FROM usuarios");
    return usuarios;
}

async function getLogin(email) {
    const db = await dbPromise;
    const usuarios = await db.get("SELECT senha FROM usuarios WHERE email = ?", [email]);
    return usuarios;
}

async function getUsuarioById(id) {
    const db = await dbPromise;
    const usuario = await db.get("SELECT * FROM usuarios WHERE id = ?", [id]);
    return usuario;
}

async function getUsuarioByEmail(email) {
    const db = await dbPromise;
    const usuario = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
    return usuario;
}

async function getAllEmailsExcludingId(id) {
    const db = await dbPromise;
    const rows = await db.all("SELECT email FROM usuarios WHERE id != ?", [id]);
    return rows.map(row => row.email);
}

async function saveUsuario(nome, email, senha, tipo) {
    const db = await dbPromise;
    await db.run("INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?,?,?,?)", [nome, email, senha, tipo]);
}

async function updateUsuario(id, novoNome, novoEmail, novaSenha, novoTipo) {
    const db = await dbPromise;
    await db.run("UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?", [novoNome, novoEmail, novaSenha, novoTipo, id]);
}

async function deleteUsuario(id) {
    const db = await dbPromise;
    await db.run("DELETE FROM usuario WHERE id = ?", [id]);
}


export {getUsuarios, getUsuarioById, getUsuarioByEmail, getAllEmailsExcludingId, saveUsuario, updateUsuario, deleteUsuario, getLogin};