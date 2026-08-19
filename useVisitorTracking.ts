import { useEffect } from 'react';

// Simple user-agent parser to avoid installing external packages
const getDeviceDetails = () => {
  const ua = navigator.userAgent;
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';
  let deviceType = 'Desktop';

  // OS detection
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Browser detection
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/opr\//i.test(ua)) browser = 'Opera';

  // Device detection
  if (/tablet|ipad/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/mobile|phone|iphone|android/i.test(ua)) {
    deviceType = 'Mobile';
  }

  return { os, browser, deviceType };
};

export const useVisitorTracking = () => {
  useEffect(() => {
    // Only track once per browser session to prevent spamming Telegram on reload
    if (sessionStorage.getItem('logged_session')) {
      return;
    }

    const trackVisitor = async () => {
      const botToken = (import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '') as string;
      const chatId = (import.meta.env.VITE_TELEGRAM_CHAT_ID || '') as string;

      if (!botToken || !chatId) {
        console.log('[Analytics] Telegram credentials missing. Skipping tracking.');
        return;
      }

      try {
        // Fetch geo-location details (HTTPS, free, no key required)
        let geoData = {
          ip: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          country_name: 'Unknown',
          org: 'Unknown',
        };

        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            geoData = await res.json();
          }
        } catch (e) {
          console.warn('[Analytics] Geo IP lookup failed', e);
        }

        const { os, browser, deviceType } = getDeviceDetails();
        const referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct / Bookmark';
        const screenResolution = `${window.screen.width}x${window.screen.height}`;
        const language = navigator.language;

        // Build HTML Message payload for Telegram
        const messageText = `
<b>🟢 New Visitor on Portfolio!</b>

📍 <b>Location:</b> ${geoData.city}, ${geoData.region}, ${geoData.country_name}
💻 <b>Device / OS:</b> ${deviceType} (${os})
🌐 <b>Browser:</b> ${browser}
🔗 <b>Referrer:</b> ${referrer}
📏 <b>Screen & Lang:</b> ${screenResolution} | ${language}
🏢 <b>ISP / Provider:</b> ${geoData.org || 'Unknown'}
🔌 <b>IP Address:</b> <code>${geoData.ip}</code>
        `.trim();

        // Send to Telegram Bot API
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: 'HTML',
          }),
        });

        if (response.ok) {
          sessionStorage.setItem('logged_session', 'true');
        }
      } catch (err) {
        console.error('[Analytics] Failed to log visit to Telegram', err);
      }
    };

    // Delay slightly to not block initial page rendering performance
    const timer = setTimeout(() => {
      trackVisitor();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
};
