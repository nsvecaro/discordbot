# PljugaBot

Discord bot za upravljanje serverom.

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
