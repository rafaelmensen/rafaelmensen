document.querySelectorAll('.select-metros').forEach(button => {
    button.addEventListener('click', function() {
        const material = this.getAttribute('data-material');
        const preco = this.getAttribute('data-preco');
        openModal(material, preco);
    });
});

function openModal(material, preco) {
    const modal = document.getElementById('modal');
    const quantidadeContainer = document.getElementById('quantidade-metros');
    quantidadeContainer.innerHTML = ''; // Limpa o conteúdo anterior

    // Cria botões de 1 a 50
    for (let i = 1; i <= 50; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('quantidade-button');
        button.addEventListener('click', function() {
            const resultado = document.querySelector(`.resultado[data-material="${material}"]`);
            const valor = i * preco; // Calcula o valor
            resultado.textContent = `${material}: ${i} metros, Total: R$ ${valor.toFixed(2)}`;
            modal.style.display = 'none'; // Fecha o modal
            document.getElementById('gerar-pdf').style.display = 'block'; // Mostra o botão de gerar PDF
        });
        quantidadeContainer.appendChild(button);
    }

    modal.style.display = 'block'; // Abre o modal

    // Fecha o modal ao clicar no "x"
    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    // Fecha o modal ao clicar fora do conteúdo
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Geração do PDF
document.getElementById('gerar-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resultados = Array.from(document.querySelectorAll('.resultado')).map(res => res.textContent).join('\n');

    doc.text(resultados, 10, 10);
    doc.save('resultados_materiais.pdf');
});

