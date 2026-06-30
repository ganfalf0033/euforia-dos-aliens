document.addEventListener('DOMContentLoaded', () => {
  const thoughts = Array.from(document.querySelectorAll('.thought'));
  const sections = Array.from(document.querySelectorAll('.section-divider'));
  const pagination = document.getElementById('pagination');
  const thoughtsPerPage = 5;

  function getPageForThoughtIndex(index) {
    const position = thoughts.findIndex(thought => thought.dataset.index === String(index));
    if (position === -1) return 1;
    return Math.ceil((position + 1) / thoughtsPerPage);
  }

  function showVisibleSections(start, end) {
    sections.forEach(section => {
      const startIndex = section.dataset.startIndex;
      const sectionThoughtPosition = thoughts.findIndex(thought => thought.dataset.index === startIndex);
      const shouldShow = sectionThoughtPosition >= start && sectionThoughtPosition < end;
      section.style.display = shouldShow ? 'block' : 'none';
    });
  }

  function showPage(page, targetSelector = null) {
    const pageCount = Math.ceil(thoughts.length / thoughtsPerPage);
    const safePage = Math.min(Math.max(page, 1), pageCount);
    const start = (safePage - 1) * thoughtsPerPage;
    const end = start + thoughtsPerPage;

    thoughts.forEach((thought, index) => {
      thought.style.display = index >= start && index < end ? 'block' : 'none';
    });

    showVisibleSections(start, end);

    document.querySelectorAll('.pagination button').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.page) === safePage);
    });

    const target = targetSelector ? document.querySelector(targetSelector) : document.getElementById('thoughts-container');
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }

  function createPaginationButtons() {
    const pageCount = Math.ceil(thoughts.length / thoughtsPerPage);

    pagination.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.dataset.page = i;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        history.replaceState(null, '', `#pagina-${i}`);
        showPage(i);
      });
      pagination.appendChild(btn);
    }
  }

  function handleHash() {
    const hash = window.location.hash.replace('#', '').trim();

    if (hash === 'mundo') {
      showPage(getPageForThoughtIndex(1), '#mundo');
      return;
    }

    if (hash === 'subsolo') {
      showPage(getPageForThoughtIndex(12), '#subsolo');
      return;
    }

    if (hash.startsWith('pagina-')) {
      const page = Number(hash.replace('pagina-', ''));
      showPage(Number.isNaN(page) ? 1 : page);
      return;
    }

    const thoughtIndex = Number(hash);
    if (!Number.isNaN(thoughtIndex) && hash !== '') {
      showPage(getPageForThoughtIndex(thoughtIndex), `.thought[data-index="${thoughtIndex}"]`);
      return;
    }

    showPage(1);
  }

  createPaginationButtons();
  handleHash();
  window.addEventListener('hashchange', handleHash);
});
