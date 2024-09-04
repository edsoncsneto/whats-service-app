import { dbPromise } from "./db.js";

const usuarios = [
    {
        nome: "Edson Costa de Siqueira Neto",
        email: "edson@gmail.com",
        senha: "12345",
        tipo: "administrador"
    },
    {
        nome: "Cláudio Farias",
        email: "claudio@gmail.com",
        senha: "12345",
        tipo: "cliente"
    }
]


const planos = [
    {
        nome: "Plano Lite",
        descricao: "Ideal para usuários que estão começando a explorar nossas soluções de atendimento automatizado.",
        preco: 699.99
    }
];

async function addPlanos() {
    const db = await dbPromise;
    for (let x = 0; x <planos.length; x++){
        await db.run(`INSERT INTO planos (nome, descricao, preco) VALUES (?,?,?)`, [planos[x].nome, planos[x].descricao, planos[x].preco]);
    }
}

async function addMainUser() {
    const db = await dbPromise;
    for (let x = 0; x < usuarios.length; x++) {
        await db.run(`INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?,?,?,?)`, [usuarios[x].nome, usuarios[x].email, usuarios[x].senha, usuarios[x].tipo]);
    }
}

addPlanos().then(() => console.log("Planos adicionados ao BD"));
addMainUser().then(() => console.log("Main user adicionado ao BD"));