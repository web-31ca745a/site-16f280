# Tracking Setup Guide

This site includes invisible tracking notifications that alert you when she interacts with the site.

## What Gets Tracked

- ✅ **Login Success** - When she unlocks the site
- ✅ **Audio Plays** - When she plays any audio file (imgrowing.wav, whatiwant.wav, etc.)
- 🔜 Tab changes (optional - not yet implemented)
- 🔜 Drawing interactions (optional - not yet implemented)

## What Information Is Sent

Each notification includes:
- 🕐 **Timestamp** (Pacific Time)
- 📱 **Device Type** (Mobile/Desktop/iPad)
- 🌐 **Browser** (Chrome, Safari, Firefox, etc.)
- 💻 **Operating System** (iOS, Android, Windows, macOS, etc.)
- 🔍 **IP Address** (to distinguish her from you)
- 📝 **Action Details** (which audio played, etc.)

## How to Enable Tracking

### Step 1: Create a Discord Webhook

1. **Create a Discord server** (or use an existing one)
2. Go to **Server Settings** → **Integrations** → **Webhooks**
3. Click **"New Webhook"**
4. Name it something like "Bella Site Tracker"
5. Choose a channel for notifications
6. Click **"Copy Webhook URL"** - it will look like:
   ```
   https://discord.com/api/webhooks/1234567890/abcdefghijklmnop
   ```

### Step 2: Add Webhook to Your Project

1. Create a `.env` file in the project root (if it doesn't exist):
   ```bash
   touch .env
   ```

2. Add your webhook URL to `.env`:
   ```env
   VITE_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE
   ```

3. **Important:** The `.env` file is already in `.gitignore`, so it won't be committed to GitHub

### Step 3: Rebuild and Deploy

```bash
npm run build
npx gh-pages -d dist --repo https://TOKEN@github.com/web-31ca745a/site-16f280.git
git add TRACKING_SETUP.md src/
git commit -m "Add tracking system"
git push https://TOKEN@github.com/web-31ca745a/site-16f280.git master
```

## How to Test

1. **Set up the webhook** (see above)
2. **Clear your browser data** for the site (to simulate a fresh visit)
3. **Visit the site** and log in
4. **Play an audio file**
5. **Check your Discord channel** - you should see notifications!

## Notification Examples

**Login:**
```
✨ Site Unlocked
🕐 Time: Jan 15, 2025, 3:42 PM
📱 Device: Mobile (iOS)
🌐 Browser: Safari
🔍 IP: 192.168.1.123
🔓 Status: Successfully logged in
```

**Audio Play:**
```
✨ Audio Played
🕐 Time: Jan 15, 2025, 3:45 PM
📱 Device: Mobile (iOS)
🌐 Browser: Safari
🔍 IP: 192.168.1.123
🎵 Track: imgrowing
```

## Privacy & Detection

- **Completely invisible** - She won't see anything different
- **No popups or alerts** - Everything happens silently in the background
- **Works with most ad blockers** - Discord webhooks are not flagged as tracking domains
- **IP-based identification** - You can tell her visits apart from yours by IP address and device info

## Disabling Tracking

To disable tracking:
1. Remove or comment out the `VITE_WEBHOOK_URL` line in `.env`
2. Rebuild and redeploy

Or simply don't set up the webhook at all - the site will work normally without it.

## Alternative Webhook Services

If you don't want to use Discord, you can use:

- **IFTTT Webhooks** - Can send SMS/email
- **ntfy.sh** - Push notifications to your phone
- **Pipedream** - More advanced automation
- **Slack Webhooks** - If you use Slack

Just change the `VITE_WEBHOOK_URL` in `.env` to point to your chosen service.
