function copyFromData(link, event) {
  event.preventDefault();

  // getAttribute, ne link.href – ten by mohl být prohlížečem upravený
  const href = link.getAttribute('href');
  const base64 = href.split(',')[1];

  // dekódování base64 -> bytes -> text (kvůli UTF-8 diakritice)
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const text = new TextDecoder('utf-8').decode(bytes);

  navigator.clipboard.writeText(text)
    .then(() => showCopied(link))
    .catch(err => console.error('Chyba při kopírování:', err));

  return false;
}

function showCopied(link) {
  const span = link.querySelector('.link-text');
  const original = span.textContent;
  const successText = link.dataset.clipboard || 'zkopírováno ✓';

  span.textContent = successText;
  link.classList.add('copied');

  // zruš předchozí časovač, pokud se kliklo víckrát rychle po sobě
  clearTimeout(link._copyTimeout);
  link._copyTimeout = setTimeout(() => {
    span.textContent = original;
    link.classList.remove('copied');
  }, 1500);
}