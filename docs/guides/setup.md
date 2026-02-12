# Setup Guide — UFN Admissions System

This guide walks through everything needed to get the admissions system running from scratch.

## Prerequisites

- Node.js 18+ installed
- A [Supabase](https://supabase.com) account (free tier is sufficient)
- A [Resend](https://resend.com) account (free tier: 100 emails/day)
- Access to DNS settings for your email domain (for branded emails)

## 1. Supabase Project Setup

### Create the project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Choose a name (e.g., `ufn-admisiones`), set a database password, and select a region close to Reynosa (e.g., US East)
4. Wait for the project to finish provisioning

### Run the database schema

1. In the Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** — this creates all tables, indexes, RLS policies, and seeds the initial required documents (INE and Certificado de preparatoria)

### Create the storage bucket

1. Go to **Storage** in the Supabase sidebar
2. Click **New Bucket**
3. Name: `application-documents`
4. **Uncheck** "Public bucket" (it must be private)
5. Under **Allowed MIME types**, add: `application/pdf`, `image/jpeg`, `image/png`
6. Set **File size limit** to `5MB`
7. Click **Create Bucket**

### Set up storage policies

In **Storage > Policies** for the `application-documents` bucket, create these policies:

**Policy 1 — Anyone can upload:**
- Policy name: `Allow public uploads`
- Allowed operation: `INSERT`
- Target roles: leave empty (public)
- Policy: `true`

**Policy 2 — Admins can read:**
- Policy name: `Admins can read`
- Allowed operation: `SELECT`
- Target roles: `authenticated`
- Policy: `true`

### Create the first admin user

1. Go to **Authentication > Users**
2. Click **Add User > Create New User**
3. Enter the admin's email and a strong password
4. Check **Auto Confirm User**
5. Click **Create User**

Repeat for each staff member who needs admin access.

### Get your API keys

1. Go to **Settings > API**
2. Copy the **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy the **anon/public** key

## 2. Resend Setup

### Create an API key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click **Create API Key**
3. Name: `ufn-admisiones`
4. Permission: **Sending access**
5. Copy the key

### Verify your domain (for branded emails)

1. Go to **Domains** in Resend
2. Click **Add Domain** and enter your domain (e.g., `ufn.edu.mx`)
3. Resend will give you DNS records to add (SPF, DKIM, DMARC)
4. Add these records in your domain's DNS settings
5. Wait for verification (can take a few minutes to a few hours)

> Until the domain is verified, Resend will send emails from `onboarding@resend.dev` instead of `admisiones@ufn.edu.mx`. The system still works — emails will just come from a generic address.

## 3. Environment Variables

Edit the `.env.local` file in the project root:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Resend
RESEND_API_KEY=re_your-api-key-here
EMAIL_FROM=admisiones@ufn.edu.mx
```

Replace the placeholder values with your actual keys from steps 1 and 2.

## 4. Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`.

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Application form: `http://localhost:3000/inscripcion`

## 5. Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the project
3. In **Environment Variables**, add the same 4 variables from `.env.local`
4. Click **Deploy**

After deployment, update your Supabase project:
1. Go to **Authentication > URL Configuration**
2. Set **Site URL** to your Vercel domain (e.g., `https://ufn.edu.mx`)

## Managing Required Documents

To add or change what documents applicants need to submit:

1. Go to Supabase dashboard > **Table Editor > required_documents**
2. To add a document: click **Insert Row**, fill in `nombre`, `descripcion`, `obligatorio`, and set `activo` to `true`
3. To deactivate a document: set `activo` to `false` (it won't appear on the form but existing records are preserved)

This can also be done via the SQL Editor:

```sql
-- Add a new required document
INSERT INTO required_documents (nombre, descripcion, obligatorio)
VALUES ('Acta de nacimiento', 'Copia del acta de nacimiento.', true);

-- Deactivate a document
UPDATE required_documents SET activo = false WHERE nombre = 'INE o identificación oficial';
```
