fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    if (data.country_code !== 'UZ') {
      // Если не из Узбекистана — перенаправляем
      window.location.href = 'block.html'; // или твоя страница "нет доступа"
    }
  })
  .catch(err => console.error('Ошибка при определении страны:', err));
