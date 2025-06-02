import WebApp from '@twa-dev/sdk';

// Инициализация Telegram Web App
WebApp.ready();

// Настройка темы
WebApp.setHeaderColor('#2196F3'); // SLB синий
WebApp.setBackgroundColor('#ffffff');

// Экспортируем объект WebApp для использования в других компонентах
export { WebApp }; 