document.addEventListener('DOMContentLoaded', () => {
    // Função para preencher a tabela de Contratos
    fetch('http://localhost:3000/api/contratos')
        .then(response => response.json())
        .then(contratos => {
            const tbodyContratos = document.querySelector('#contratos tbody');
            contratos.forEach(contrato => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${contrato.id}</td>
                <td>${contrato.nome_plano}</td>
                <td>${contrato.nome_usuario}</td>
                <td>${contrato.status}</td>
            `;
                tbodyContratos.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar contratos:', error));
});