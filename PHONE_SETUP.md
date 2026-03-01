r# 📱 How to Run This App on Your Phone

You're new to React Native — no problem! Follow these steps to see the app on your **physical phone**.

---

## Step 1: Install Expo Go on Your Phone

| Phone Type | What to Do |
|------------|------------|
| **iPhone** | Open App Store → Search "Expo Go" → Install |
| **Android** | Open Play Store → Search "Expo Go" → Install |

Expo Go is a free app that lets you run React Native apps without building them yourself.

---

## Step 2: Connect Your Phone & Computer to the Same WiFi

**Important:** Your phone and your Mac must be on the **same WiFi network**.

---

## Step 3: Start the Development Server

Open Terminal and run:

```bash
cd /Users/a91093/Desktop/music_player
npm start
```

(or `npx expo start`)

---

## Step 4: Scan the QR Code

After running the command, you'll see a **QR code** in the terminal.

| Phone Type | How to Scan |
|------------|-------------|
| **iPhone** | Open the **Camera app** → Point at QR code → Tap the notification that appears |
| **Android** | Open **Expo Go app** → Tap "Scan QR code" → Scan the QR code in terminal |

The app will load on your phone! 🎉

---

## Troubleshooting

### "Couldn't connect" or "Network error"
- Make sure phone and Mac are on the **same WiFi**
- Try **tunnel mode**: Press `s` in the terminal, then choose "Use tunnel" — this works even on different networks (slower but more reliable)

### QR code doesn't work on iPhone
- Make sure you're using the **Camera app**, not Expo Go, to scan
- Or: In Expo Go, tap "Enter URL manually" and type the URL shown in the terminal (starts with `exp://`)

### Android: "Expo Go couldn't connect"
- Enable **USB debugging** on your phone (Settings → Developer options)
- Connect phone via USB cable
- Run `npm run android` instead — it will install directly to your phone

---

## Quick Reference

| Command | What it does |
|---------|--------------|
| `npm start` | Start dev server, shows QR code |
| `npm run ios` | Run on iOS Simulator (Mac only) |
| `npm run android` | Run on Android emulator or connected device |
| `npm run web` | Run in web browser |

---

**Once you see "It's working on your phone!" on your device, you're all set!** 🚀
