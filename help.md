npm install next-auth

google APIs (`for github use different email address in database``):
Authorized JavaScript origins
http://localhost:3000

Authorized redirect URIs
http://localhost:3000
http://localhost:3000/api/auth/callback/google

For NEXTAUTH_SECRET run command:
openssl rand -base64 32

Steps:
1- docker-compose up
2- npx prisma init
3- npx prisma generate
3b- npx prisma migrate //for postgress
3- npx prisma generate --schema=./src/prisma/schema.prisma
4- npx prisma migrate dev --schema=./src/prisma/schema.prisma
before push:
4a- npm i --save-dev prisma@latest
4b- npm i @prisma/client@latest
4c- npx prisma db push
5- npm run dev

### To update all packages in package.json
`npm update --save`

### cloudinary
https://cloudinary.com/guides/front-end-development/integrating-cloudinary-with-next-js

### For assets:
https://unsplash.com/s/photos/beach-house

### Vercel Deployment:
in project settings use install command `npm install --legacy-peer-deps`

### Docker & docker-compose:
create Dockerfile and run command
```
docker build -t property-website . //to build image
docker run -d --name property-website -p 3001:3000 property-website //to build container
```

To use docker-compose create file docker-compose.yml in root and run command
```
docker-compose up --build
```

create file with the name makefile and then run command:
```
make up
```
To reclaim space used by docker:
```
docker system prune -a 
```
### Remove node_-_modules
- `sudo rm -r node_modules`

<!--
https://www.youtube.com/watch?v=c_-b_isI4vg&t=249s
https://github.com/AntonioErdeljac/next13-airbnb-clone

//example to follow seeding data
https://github.com/turteltech/nextjs-airbnb-clone-starter/blob/master/server/scripts/seed.ts

CORSS:
https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
-->
