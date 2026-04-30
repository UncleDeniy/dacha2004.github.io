let dachaInstallPrompt = null;

async function registerPWA() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (e) {
    console.warn('Service Worker не зарегистрирован:', e);
  }
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  dachaInstallPrompt = e;
  document.querySelectorAll('[data-install-app]').forEach(btn => btn.classList.remove('hide'));
});

async function installApp() {
  if (!dachaInstallPrompt) {
    toast('Если кнопка установки не появилась — открой сайт через HTTPS/GitHub Pages и добавь через меню браузера');
    return;
  }
  dachaInstallPrompt.prompt();
  await dachaInstallPrompt.userChoice;
  dachaInstallPrompt = null;
}

async function enableNotifications() {
  if (!('Notification' in window)) {
    toast('Этот браузер не поддерживает уведомления');
    return false;
  }
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    localStorage.setItem('d2004_notifications', '1');
    toast('Уведомления включены');
    return true;
  }
  localStorage.setItem('d2004_notifications', '0');
  toast('Уведомления не разрешены');
  return false;
}

async function sendLocalNotification(title, body, url = './chat.html') {
  if (localStorage.getItem('d2004_notifications') !== '1') return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const reg = await navigator.serviceWorker?.ready.catch(() => null);
  if (reg?.active) {
    reg.active.postMessage({ type: 'SHOW_NOTIFICATION', title, body, url, tag: 'dacha2004-chat' });
  } else {
    new Notification(title, { body, icon: './assets/img/logo.png' });
  }
}

async function testNotification() {
  const ok = Notification.permission === 'granted' || await enableNotifications();
  if (ok) sendLocalNotification('Дача 2004', 'Тестовое уведомление работает 🔔', './index.html');
}

registerPWA();
