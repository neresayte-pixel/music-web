const ALLOWED = ['RU', 'UZ'];      
const NO_ACCESS_PAGE = 'block.html'; 


if (!location.pathname.endsWith(NO_ACCESS_PAGE)) {

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  fetch('https://ipapi.co/json/', { signal: controller.signal })
    .then(res => {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('network');
      return res.json();
    })
    .then(data => {
      const country = (data && data.country_code) ? data.country_code.toUpperCase() : null;
      if (!country || !ALLOWED.includes(country)) {
        window.location.href = NO_ACCESS_PAGE;
      } else {
   
        const blocker = document.getElementById('geo-blocker');
        if (blocker) blocker.style.display = 'none';
      }
    })
    .catch(err => {
      console.error('Geo check failed:', err);
 
      window.location.href = NO_ACCESS_PAGE;
    });
}