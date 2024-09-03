import { dbPromise } from "./db.js";

const mainUser = {
    nome: "Edson Costa de Siqueira Neto",
    email: "edson@gmail.com",
    senha: "12345",
    tipo: "administrador"
}

const planos = [
    {
        nome: "Plano Lite",
        descricao: "Ideal para usuários que estão começando a explorar nossas soluções de atendimento automatizado. O Plano Lite oferece funcionalidades básicas de chatbot com limites moderados em número de interações e personalização. Ideal para pequenas empresas ou para testes iniciais. Inclui suporte básico e acesso a um número limitado de integrações.",
        preco: 699.99
    },
    {
        nome: "Plano Plus",
        descricao: "Perfeito para empresas que precisam de um atendimento automatizado mais robusto e flexível. O Plano Plus inclui funcionalidades avançadas como personalização extensiva do chatbot, análise detalhada de interações, e suporte prioritário. Oferece limites mais altos em número de interações e integrações, além de permitir a integração com várias plataformas e serviços adicionais. Ideal para empresas que buscam uma solução completa para melhorar o atendimento ao cliente e otimizar processos.",
        preco: 1299.99
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
    await db.run(`INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?,?,?,?)`, [mainUser.nome, mainUser.email, mainUser.senha, mainUser.tipo]);
}

addPlanos().then(() => console.log("Planos adicionados ao BD"));
addMainUser().then(() => console.log("Main user adicionado ao BD"));