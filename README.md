# PljugaBot

Discord bot za upravljanje serverom.

## Setup

1. Kloniraj repozitorij
```bash
git clone <repository-url>
cd PljugaBot
```

2. Instaliraj dependencies
```bash
npm install
```

3. Kreiraj `config.json` fajl
```bash
cp config.example.json config.json
```

4. Popuni `config.json` sa svojim vrijednostima:
   - `token`: Discord bot token (iz [Discord Developer Portal](https://discord.com/developers/applications))
   - `clientId`: Bot Application ID
   - `adminId`: Tvoj Discord user ID

5. Pokreni bota
```bash
node index.js
```

## Komande

### Admin komande
- `!clear` - Brisanje poruka
- `!say` - Bot šalje poruku
- `!slika` - Slanje slika
- `!rules` - Pravila
- `!wof` - Wheel of Fortune
- `!lanes` - League of Legends lanes
- `!colors` - Upravljanje color rolama
- `!lranks` - League rank role
- `!ranks` - Upravljanje rankovima

### Utility komande
- `!slike` - Random slike
- `!vote` - Voting sistem

### Fun komande
- Razne response komande

## Struktura projekta

```
PljugaBot/
├── commands/
│   ├── admin/
│   ├── utility/
│   └── fun/
├── events/
│   └── messageCreate.js
├── slike/
├── config.json (ignored)
├── config.example.json
├── index.js
└── package.json
```
