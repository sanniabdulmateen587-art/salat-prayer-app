// SALAT loader - fetches and mounts the full app
async function loadSalat() {
  const parts = [];
  for (let i = 0; i < 5; i++) {
    const r = await fetch('/chunks/c' + i + '.txt');
    parts.push(await r.text());
  }
  const b64 = parts.join('');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const code = new TextDecoder().decode(bytes);
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  await import(url);
}
loadSalat().catch(e => {
  console.error(e);
  document.getElementById('root').innerHTML = '<div style="padding:2rem;text-align:center;font-family:system-ui"><div style="font-size:3rem">🕌</div><h1>SALAT</h1><p>Loading error. Please refresh.</p><pre style="text-align:left;font-size:12px;color:#666">'+e+'</pre></div>';
});
