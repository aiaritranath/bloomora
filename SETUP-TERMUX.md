# Running Bloomora in Termux (testing only)

Current state: scaffold + database schema + seed. The storefront pages come in later phases.

## 1. Install Termux
Use the **F-Droid** build. The Play Store build is outdated.

## 2. Install tools
```
pkg update && pkg upgrade -y
pkg install -y nodejs-lts unzip nano
termux-setup-storage
```

## 3. Unzip the project
```
cp ~/storage/downloads/bloomora.zip ~
cd ~ && unzip bloomora.zip && cd bloomora
```

## 4. Configure
```
cp .env.example .env.local
nano .env.local
```
Minimum for now: `DATABASE_URL` and `DIRECT_URL`.
Free hosted Postgres: create a Supabase project and copy its connection strings
(Project Settings > Database). `DATABASE_URL` = pooler, `DIRECT_URL` = direct.

## 5. Install and run
```
npm install
npm run dev -- --webpack -H 0.0.0.0
```
Open http://localhost:3000 in your phone browser, then tap "Check app and database".
Other devices on the same Wi-Fi can use http://<phone-ip>:3000.

## 6. Database (create tables and seed)
```
npx prisma migrate dev --create-only --name init
```
Paste `prisma/sql/constraints.sql` at the end of the new `prisma/migrations/*/migration.sql`, then:
```
npx prisma migrate dev
npm run db:seed
```

## If native binaries fail (likely on Android)
Prisma's migration engine, Tailwind and SWC ship Linux builds that may not exist for
Android/Termux. If `npm install` or `prisma migrate` errors with a missing binary,
use a normal Linux userland inside Termux:
```
pkg install proot-distro
proot-distro install ubuntu
proot-distro login ubuntu --shared-tmp
apt update && apt install -y curl unzip ca-certificates
curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt install -y nodejs
```
Then repeat steps 3-6 inside Ubuntu (your phone storage is under /sdcard if you ran
`termux-setup-storage` first). It is slower but behaves like a normal server.

## Notes
- Run `npm run build` once to check the production build before deploying.
- Termux is for testing. For real hosting, deploy to Vercel (see README in later phases).
- Never commit `.env.local`.
