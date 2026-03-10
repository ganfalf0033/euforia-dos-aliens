document.addEventListener('DOMContentLoaded', () => {

  const thoughts = document.querySelectorAll('.thought');
  const pagination = document.getElementById('pagination');
  const thoughtsPerPage = 5;

  function showPage(page) {

    thoughts.forEach(thought => thought.style.display = 'none');

    const start = (page - 1) * thoughtsPerPage;
    const end = start + thoughtsPerPage;

    for (let i = start; i < end && i < thoughts.length; i++) {
      thoughts[i].style.display = 'block';
    }

    document.querySelectorAll('.pagination button')
      .forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.querySelector(`.pagination button[data-page="${page}"]`);

    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    document.getElementById('thoughts-container')
      .scrollIntoView({ behavior: 'smooth' });

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

  createPaginationButtons();

  const hash = window.location.hash;

  if (hash) {

    const index = parseInt(hash.replace('#',''));

    if (!isNaN(index)) {

      const page = Math.ceil(index / thoughtsPerPage);

      showPage(page);

      setTimeout(() => {

        const target = document.querySelector(`.thought[data-index="${index}"]`);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }

      }, 200);

    } else {

      showPage(1);

    }

  } else {

    showPage(1);

  }

});