# Battery Dashboard

Web sučelje za nadzor baterija, izrađeno u sklopu završnog rada.
Arduino/ESP uređaji šalju očitanja (napon, struja, temperatura) backendu
[`sensor-api`], a ova aplikacija ih prikazuje korisniku nakon prijave.

## Funkcionalnosti

- **Prijava** – email i lozinka, autentikacija JWT tokenom (opcija „Zapamti me”)
- **Zaštićene rute** – bez valjanog tokena korisnik se vraća na prijavu
- **Dashboard** – grafovi napona i temperature kroz vrijeme
- **Uređaji** – popis registriranih uređaja

## Tehnologije

- React 19 + TypeScript
- Vite
- React Router
- Axios
- Recharts (grafovi)
- CSS Modules / Tailwind CSS

## Pokretanje

Potrebno: Node.js 20+ i pokrenut backend (`sensor-api`) na `http://localhost:3000`.

```bash
npm install
npm run dev
```

Aplikacija je dostupna na `http://localhost:5173`.

### Konfiguracija

Adresa backenda zadana je na `http://localhost:3000`. Za drugu adresu
kopiraj `.env.example` u `.env` i promijeni vrijednost:

VITE_API_URL=http://localhost:3000


## Backend

Podaci dolaze iz REST API-ja `sensor-api` (Node.js, Express, PostgreSQL):

| Metoda | Ruta | Opis |
|--------|------|------|
| POST | `/api/auth/login` | prijava, vraća JWT |
| GET | `/api/readings` | zadnjih 100 očitanja |
| GET | `/api/devices` | svi uređaji |
| POST | `/api/readings` | uređaj šalje novo očitanje |


