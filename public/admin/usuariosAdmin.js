document.addEventListener('DOMContentLoaded', () => {
    // Função para preencher a tabela de usuários
    fetch('http://localhost:3000/api/usuarios')
        .then(response => response.json())
        .then(usuarios => {
            const tbodyUsuarios = document.querySelector('#usuarios tbody');
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.tipo}</td>
                `;
                tbodyUsuarios.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar usuários:', error));
});
