# Join

## Stack

- Payload CMS 3
- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- MongoDB
- Docker


## Running

### Requisites
- Docker
- Node 20
- pnpm

### Running

Run `pnpm install` to install the dependencies
Run `pnpm db:up` to start the database and the services (minio, email, db)

Setup minio bucket
Go to `http://localhost:9000` and create a bucket named like `S3_BUCKET` (in .env)

Run `pnpm dev` to start the project
Go to `http://localhost:3000` and you should see the app running

If you have mongodb connection error:
- Get your IP address and replace `localhost` in the `.env` file for the variables: S3_ENDPOINT, DATABASE_URI, SMTP_HOST

Admin panel is at `http://localhost:3000/admin`
A script will create the admin user on the first run:
email and password are in PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD in .env