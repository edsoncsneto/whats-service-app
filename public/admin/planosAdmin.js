document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('new-plan-modal');
    const btn = document.getElementById('new-plan-btn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('new-plan-form');
    const modalTitle = document.getElementById('modal-title');
    const submitBtn = document.getElementById('submit-btn');
    const planIdInput = document.getElementById('plano-id');

    //modal
    btn.onclick = () => {
        modal.style.display = 'block';
        modalTitle.textContent = 'Cadastrar Novo Plano';
        submitBtn.textContent = 'Cadastrar';
        form.reset();
        planIdInput.value = '';
    }

    span.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    //cadastro/edição
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const preco = document.getElementById('preco').value;
        const planoId = planIdInput.value;

        const url = planoId ? `http://localhost:3000/api/planos/${planoId}` : 'http://localhost:3000/api/planos';
        const method = planoId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, preco })
        })
        .then(response => {
            if (response.ok) {
                alert(`Plano ${planoId ? 'editado' : 'cadastrado'} com sucesso!`);
                modal.style.display = 'none';
                location.reload(); // Recarrega a página para atualizar a tabela
            } else {
                alert('Erro ao processar o plano.');
            }
        })
        .catch(error => console.error('Erro ao processar o plano:', error));
    });

    //carregar e exibir os planos existentes
    fetch('http://localhost:3000/api/planos')
        .then(response => response.json())
        .then(planos => {
            const tbodyPlanos = document.querySelector('#planos tbody');
            planos.forEach(plano => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${plano.id}</td>
                    <td>${plano.nome}</td>
                    <td>${plano.descricao}</td>
                    <td>${plano.preco}</td>
                    <td>
                        <button class="edit-btn" data-id="${plano.id}">Editar</button>
                        <button class="delete-btn" data-id="${plano.id}">Excluir</button>
                    </td>
                `;
                tbodyPlanos.appendChild(row);
            });

            //adicionar eventos aos botões de editar
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const planoId = event.target.getAttribute('data-id');
                    fetch(`http://localhost:3000/api/planos/${planoId}`)
                        .then(response => response.json())
                        .then(plano => {
                            modal.style.display = 'block';
                            modalTitle.textContent = 'Editar Plano';
                            submitBtn.textContent = 'Salvar';
                            document.getElementById('nome').value = plano.nome;
                            document.getElementById('descricao').value = plano.descricao;
                            document.getElementById('preco').value = plano.preco;
                            planIdInput.value = plano.id;
                        })
                        .catch(error => console.error('Erro ao carregar plano para edição:', error));
                });
            });

            //adicionar eventos aos botões de excluir
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const planoId = event.target.getAttribute('data-id');

                    fetch(`http://localhost:3000/api/planos/${planoId}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (response.ok) {
                                event.target.closest('tr').remove(); // Remove a linha da tabela
                            } else {
                                console.error('Erro ao excluir plano');
                            }
                        })
                        .catch(error => console.error('Erro ao excluir plano:', error));
                });
            });
        })
        .catch(error => console.error('Erro ao carregar planos:', error));
});
