# Library-Backend
Projektni zadatak iz predmeta Skriptni Jezici

## Projekat ima 3 servisa
### 1. REST servis koji eksponira podatke u bazi
  - CRUD operacije za sve entitete u bazi
  - Validacija na svim korisničkim unosima (Joi ili po slobodnom izboru)
  - Autorizacija (korisnika koji je autentifikovan)
### 2. Servis za autentifikaciju
  - Registrovanje korisnika (samo API, ne GUI)
  - Autentifikacija (login, JWT, samo API)
### 3. Aplikacioni servis
  - Servira HTML i prateće resurse aplikacije (GUI)

## Pokretanje:
`node app_server.js`

`node auth_server.js`

`node rest_server.js`
