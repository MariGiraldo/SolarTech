document.querySelectorAll('.card-info').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const detail = card.getAttribute('data-detalle');

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').textContent = detail;

    document.getElementById('modal-info').style.display = 'flex';
  });
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('modal-info').style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target.id === 'modal-info') {
    document.getElementById('modal-info').style.display = 'none';
  }
});