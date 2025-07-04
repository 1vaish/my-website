
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.error('Service Worker registration failed:', err));
    });
  }

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    console.log("Notifications enabled!");
  }
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(swReg => {
    swReg.showNotification('Hello from YourName Portfolio!', {
      body: 'Thanks for visiting!',
      icon: '/icons/icon-192x192.png'
    });
  });
}
