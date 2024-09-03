window.addEventListener("load", async () => {
    const dados = await carregarDados();
    const divPlanos = document.getElementById("planos");
    console.log(dados.preco);
    dados.forEach(element => {
        let aux = `
         <div class="planos">
            <div class="nomePlano">
                <p>${element.nome}</p>
            </div>
            <p class="porApenas">Por apenas</p>
            <p class="valor">R$${element.preco}/mês</p>
    
            <p class="texto">${element.descricao}</p>
                
                <div class="botao">
                    <button>Adquira já!</button>
                </div>
        </div>
            `;
        divPlanos.innerHTML += aux;
    });
});

async function carregarDados() {
    const dadosPlanos = await fetch("http://localhost:3000/api/planos");
    const dadosJson = await dadosPlanos.json();
    console.log(dadosJson);
    return dadosJson;
}