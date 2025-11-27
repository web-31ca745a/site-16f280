// Tracking utility for webhook notifications
// Set your Discord webhook URL in .env as VITE_WEBHOOK_URL

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

// Get visitor information
const getVisitorInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = 'Desktop';
  let browser = 'Unknown';
  let os = 'Unknown';

  // Detect device type
  if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    deviceType = /iPad/i.test(userAgent) ? 'iPad' : 'Mobile';
  }

  // Detect browser
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Edg')) browser = 'Edge';

  // Detect OS
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  return { deviceType, browser, os };
};

// Get approximate IP (uses a free IP lookup service)
const getIPAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'Unknown';
  }
};

// Main tracking function
export const trackEvent = async (eventName, details = {}) => {
  // Skip if no webhook URL configured
  if (!WEBHOOK_URL || WEBHOOK_URL === 'undefined') {
    return;
  }

  try {
    const { deviceType, browser, os } = getVisitorInfo();
    const ip = await getIPAddress();
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    // Format message for Discord
    const message = {
      embeds: [{
        title: `✨ ${eventName}`,
        color: 0xf9a8d4, // Pastel pink
        fields: [
          { name: '🕐 Time', value: timestamp, inline: true },
          { name: '📱 Device', value: `${deviceType} (${os})`, inline: true },
          { name: '🌐 Browser', value: browser, inline: true },
          { name: '🔍 IP', value: ip, inline: true },
          ...Object.entries(details).map(([key, value]) => ({
            name: key,
            value: value.toString(),
            inline: true
          }))
        ],
        timestamp: new Date().toISOString()
      }]
    };

    // Send to webhook
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  } catch (error) {
    // Silently fail - don't break the user experience
    console.debug('Tracking failed:', error);
  }
};

// Specific tracking functions for different events
export const trackLogin = () => trackEvent('Site Unlocked', { '🔓 Status': 'Successfully logged in' });
export const trackTabChange = (tabName) => trackEvent('Tab Viewed', { '📑 Tab': tabName });
export const trackAudioPlay = (trackName) => trackEvent('Audio Played', { '🎵 Track': trackName });
export const trackDrawing = () => trackEvent('Drawing Interaction', { '🎨 Action': 'Started drawing' });
