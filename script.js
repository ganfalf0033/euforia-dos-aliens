document.addEventListener('DOMContentLoaded', () => {
  const thoughts = document.querySelectorAll('.thought');
  const pagination = document.getElementById('pagination');
  const thoughtsPerPage = 5; // melhor visualização em mobile

  function showPage(page) {
    thoughts.forEach(thought => thought.style.display = 'none');
    
    const start = (page - 1) * thoughtsPerPage;
    const end = start + thoughtsPerPage;
    
    for (let i = start; i < end && i < thoughts.length; i++) {
      thoughts[i].style.display = 'block';
    }
    
    document.querySelectorAll('.pagination button').forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`.pagination button[data-page="${page}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
    
    // O scroll para o topo do container só é necessário se a paginação estiver no final
    // e o usuário clicar em um número. Se a paginação estivesse no topo, isso não seria necessário.
    document.getElementById('thoughts-container').scrollIntoView({ behavior: 'smooth' });
  }

  function createPaginationButtons() {
    const pageCount = Math.ceil(thoughts.length / thoughtsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.dataset.page = i;
      btn.addEventListener('click', () => showPage(i));
      pagination.appendChild(btn);
    }
  }

  // Inicialização
  createPaginationButtons();
  showPage(1); // Mostra a primeira página ao carregar
});