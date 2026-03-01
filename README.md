# Music Player - React Native (Expo)

A music streaming app using the JioSaavn API. Built with Expo, TypeScript, React Navigation, Zustand, and TanStack Query — following the **autonaut-platform** code structure.

## Structure (Autonaut-style)

```
src/
├── api/                    # API layer
│   ├── apiClient.ts       # Fetch client, getSearchSongs, getSongById
│   └── queryClient.ts     # TanStack Query client
├── core/
│   ├── constants.ts       # API URLs, storage keys, pagination
│   ├── types/             # Shared types (Song, SearchResponse)
│   └── utils/             # imageUtils, audioUtils
├── modules/
│   ├── home/              # Home screen
│   │   ├── components/    # HomeScreen, SongListItem
│   │   └── hooks/         # useSearchSongs
│   ├── player/
│   │   ├── components/    # PlayerScreen
│   │   ├── hooks/         # useAudioPlayer
│   │   └── store/         # playerStore (Zustand)
│   ├── mini-player/       # MiniPlayer bar
│   └── queue/
│       ├── components/    # QueueScreen
│       └── store/         # queueStore (Zustand, AsyncStorage)
├── navigation/            # AppNavigator (Stack + Tabs)
└── providers/             # AppProviders, AudioProvider
```

## Tech Stack

- **Expo** (SDK 54) + TypeScript
- **React Navigation v6** (native-stack, bottom-tabs)
- **Zustand** – player & queue state
- **TanStack Query** – search API caching
- **AsyncStorage** – queue persistence
- **expo-av** – audio playback

## Setup

```bash
npm install
npm start
```

Scan the QR code with Expo Go (same WiFi required).

## Screens

| Screen      | Functionality                                      |
|------------|-----------------------------------------------------|
| Home       | Song search, pagination, play, add to queue         |
| Player     | Full controls, seek bar, shuffle, repeat            |
| Mini Player| Persistent bar, synced with full player            |
| Queue      | Add, remove, reorder; persisted with AsyncStorage   |

## API

- Base: `https://saavn.sumit.co`
- Search: `GET /api/search/songs?query=...`
- Song: `GET /api/songs/{id}`
