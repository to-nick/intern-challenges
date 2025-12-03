# Intern Training Challenges

Welcome! These challenges will introduce you to the core technologies used in our platform. You'll build two applications from scratch, learning Next.js, Sanity.io, Tailwind CSS, Turbo Repo, PostgreSQL, and Prisma.

## 🎯 Learning Objectives

By completing these challenges, you'll understand:

- How to structure a monorepo with Turbo
- Building full-stack applications with Next.js
- Content management with Sanity.io
- Styling with Tailwind CSS
- Database operations with PostgreSQL and Prisma

## 📋 Prerequisites & Setup

Before starting, you'll need to set up your development environment.

### Required Tools

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/) (v14 or later)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)
- A [Sanity.io account](https://www.sanity.io/) (free)
- A [GitHub account](https://github.com/) (free)
- A [Vercel account](https://vercel.com/) (free)

### Setup Instructions

#### 1. Install Node.js

Check if Node.js is installed:

```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org/) (choose LTS version).

#### 2. Install pnpm

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm --version
```

#### 3. Install Git

Check if Git is installed:

```bash
git --version
```

**macOS:**

```bash
# Using Homebrew
brew install git

# Or download from git-scm.com
```

**Windows:**

Download from [git-scm.com](https://git-scm.com/download/win)

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

**Configure Git:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 4. Install PostgreSQL

**macOS:**

```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**

Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Verify Installation:**

```bash
psql --version
```

**Create a database user (if needed):**

```bash
# Connect to PostgreSQL
psql postgres

# In psql shell:
CREATE USER postgres WITH PASSWORD 'password';
ALTER USER postgres WITH SUPERUSER;
\q
```

> **Note:** If you get "role already exists" error, the user is already set up. You can skip this or use your existing credentials in the DATABASE_URL later.

#### 5. Install VS Code (Recommended)

Download from [code.visualstudio.com](https://code.visualstudio.com/)

**Recommended Extensions:**

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma

#### 6. Create Accounts

- **GitHub:** [github.com/signup](https://github.com/signup)
- **Sanity:** [sanity.io/get-started](https://www.sanity.io/get-started)
- **Vercel:** [vercel.com/signup](https://vercel.com/signup) (can sign up with GitHub)

---

## 🚀 Challenge 1: Personal Portfolio & Blog

**Duration:** 2-3 days  
**Technologies:** Next.js, Sanity.io, Tailwind CSS, Turbo Repo

### Overview

Build a personal portfolio website with a blog section powered by a headless CMS. This introduces you to our content management approach and modern web development practices.

### Part 1: Setup Turbo Repo & Git (30 mins)

#### Step 1: Initialize the Monorepo

```bash
mkdir intern-challenges
cd intern-challenges
pnpm init
```

#### Step 2: Initialize Git Repository

```bash
git init
echo "node_modules" > .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".next" >> .gitignore
echo "dist" >> .gitignore
echo ".turbo" >> .gitignore
```

Make your first commit:

```bash
git add .gitignore
git commit -m "Initial commit: Setup monorepo"
```

**Create GitHub Repository:**

1. Go to [github.com/new](https://github.com/new)
2. Name it `intern-challenges`
3. Keep it **public** (required for free Vercel deployments)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

Connect your local repo to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/intern-challenges.git
git branch -M main
```

> **Note:** Don't push yet - we'll add more files first!

#### Step 3: Create workspace structure

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Create `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

Update `package.json`:

```json
{
  "name": "intern-challenges",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

Install turbo:

```bash
pnpm install
```

Commit your workspace setup:

```bash
git add .
git commit -m "Add Turbo repo configuration"
```

📖 **Resources:**

- [Turbo Repo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)

### Part 2: Create Next.js Portfolio App (1 hour)

#### Step 1: Create the app

From your monorepo root directory (`intern-challenges`):

```bash
mkdir -p apps/portfolio
cd apps/portfolio
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir
```

Answer the prompts:

- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src directory
- ✅ Import alias (@/\*)

#### Step 2: Create basic pages

Create `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Hi, I'm [Your Name]
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Full-stack developer building amazing web experiences
          </p>
          <div className="flex gap-4">
            <a
              href="/blog"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Read My Blog
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
```

Create `app/about/page.tsx`:

```tsx
export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose prose-lg max-w-3xl">
          <p>
            I'm learning modern web development technologies including Next.js,
            Sanity.io, Tailwind CSS, and more!
          </p>
        </div>
      </div>
    </main>
  );
}
```

📖 **Resources:**

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Part 3: Setup Sanity.io CMS (1.5 hours)

> **Note:** At BackPocket, we embed Sanity Studio directly into our Next.js application rather than running it as a separate app. This approach is simpler for development and deployment - you get one app instead of two! You can also use Sanity's hosted Studio at `sanity.io/manage`, but embedding gives you more control.

#### Step 1: Create Sanity Project

First, create a Sanity project (just the backend).

Navigate to your portfolio app (if not already there):

```bash
# From root directory
cd apps/portfolio
```

Install Sanity dependencies:

```bash
pnpm add sanity next-sanity @sanity/client @sanity/image-url @portabletext/react
pnpm add -D @sanity/types
```

Login to Sanity (creates account if needed):

```bash
pnpm sanity init --env
```

Follow the prompts:

- **Create new project:** Yes
- **Project name:** `portfolio-blog`
- **Use default dataset:** Yes
- **Output path:** current directory

This will create `.env.local` with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

> **Note:** The `sanity init` command may create basic config files. We'll replace them with our embedded studio configuration in the next steps.

#### Step 2: Configure Sanity for Embedded Studio

Create (or replace) `sanity.config.ts` in `apps/portfolio`:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Portfolio Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio", // Studio will be at /studio route
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

#### Step 3: Define Blog Schema

Create directory structure and schema:

```bash
mkdir -p sanity/schemas
```

Create `sanity/schemas/post.ts`:

```typescript
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
    },
  },
});
```

Create `sanity/schemas/index.ts`:

```typescript
import post from "./post";

export const schemaTypes = [post];
```

#### Step 4: Embed Studio in Next.js

Create `app/studio/[[...tool]]/page.tsx`:

```typescript
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

> **What's happening here:** This creates a catch-all route at `/studio` that renders the Sanity Studio interface. The `[[...tool]]` syntax means it handles all sub-routes like `/studio/desk`, `/studio/vision`, etc.

#### Step 5: Access Your Studio

Start your portfolio app:

```bash
pnpm dev
```

Now you have:

- **Portfolio:** `http://localhost:3000`
- **Sanity Studio (embedded):** `http://localhost:3000/studio`

Visit `http://localhost:3000/studio` and create 2-3 blog posts!

#### Step 6: Commit Your Changes

```bash
cd ../..  # Back to root
git add .
git commit -m "Add Sanity CMS with embedded studio"
```

📖 **Resources:**

- [Sanity.io Getting Started](https://www.sanity.io/docs/getting-started)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Embedding Sanity Studio](https://www.sanity.io/docs/embedding-sanity-studio)

### Part 4: Display Blog Content (2 hours)

Now that Sanity is set up and embedded, let's fetch and display the blog posts on your portfolio.

#### Step 1: Configure Sanity Client

We already installed the dependencies, now create `lib/sanity.ts` in `apps/portfolio`:

```typescript
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // Set to true in production
});
```

The `.env.local` file should already exist from Step 1 of Part 3 with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Step 2: Create Blog List Page

Create `app/blog/page.tsx`:

```tsx
import { client } from "@/lib/sanity";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  author?: string;
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author
    }`
  );
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12">Blog</h1>
        <div className="grid gap-8 max-w-4xl">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-2xl font-bold mb-2 text-indigo-600 hover:text-indigo-800">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.author || "Anonymous"}</span>
                <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
```

#### Step 3: Create Individual Post Page

Create `app/blog/[slug]/page.tsx`:

```tsx
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  body: any;
  publishedAt: string;
  author?: string;
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      publishedAt,
      author
    }`,
    { slug }
  );
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
            <span>{post.author || "Anonymous"}</span>
            <span>•</span>
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>
        </div>
      </article>
    </main>
  );
}
```

#### Step 4: Test Your Portfolio

```bash
cd apps/portfolio
pnpm dev
```

Visit:

- **Homepage:** `http://localhost:3000`
- **Blog List:** `http://localhost:3000/blog`
- **Sanity Studio:** `http://localhost:3000/studio`

Test the full workflow:

1. Go to `/studio` and create/edit blog posts
2. Go to `/blog` to see them displayed
3. Click on a post to see the full content

#### Step 5: Commit Your Changes

```bash
cd ../..  # Back to root
git add .
git commit -m "Add blog pages with Sanity integration"
```

📖 **Resources:**

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Sanity Client](https://www.sanity.io/docs/js-client)
- [Portable Text](https://github.com/portabletext/react-portabletext)

### Part 5: Deploy to Vercel (45 mins)

Since the Sanity Studio is embedded in your Next.js app, you only need to deploy one application! Everything (portfolio, blog, and CMS) will be at the same URL.

#### Step 1: Push to GitHub

```bash
cd ../..  # Back to root if not already there
git add .
git commit -m "Complete portfolio with embedded Sanity Studio"
git push origin main
```

If you haven't pushed yet:

```bash
git push -u origin main
```

#### Step 2: Configure Sanity CORS

Before deploying, update `sanity.config.ts` to allow your production domain:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Portfolio Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  // This is optional but recommended for security
  cors: {
    allowOrigins: [
      "http://localhost:3000",
      "https://*.vercel.app", // Allows all Vercel preview URLs
    ],
  },
});
```

Commit this change:

```bash
git add apps/portfolio/sanity.config.ts
git commit -m "Add CORS configuration for Vercel"
git push
```

#### Step 3: Deploy to Vercel

1. **Sign up for Vercel** at [vercel.com](https://vercel.com) (use GitHub to sign in)
2. Click **"Add New Project"**
3. **Import your GitHub repository** (`intern-challenges`)
4. **Configure the project:**

   - Framework Preset: **Next.js**
   - Root Directory: **apps/portfolio**
   - Build Command: `cd ../.. && pnpm install && pnpm --filter=portfolio build`
   - Output Directory: `.next`

5. **Add Environment Variables:**

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   > Find these values in your local `.env.local` file or at [sanity.io/manage](https://www.sanity.io/manage)

6. Click **Deploy**

Your portfolio will be live in 2-3 minutes at `https://your-project.vercel.app`!

#### Step 4: Update Sanity API Settings (Optional but Recommended)

Add your production URL to Sanity's allowed origins:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (`portfolio-blog`)
3. Go to **Settings** → **API**
4. Under **CORS Origins**, click **Add CORS origin**
5. Add your Vercel URL: `https://your-project.vercel.app`
6. Check **Allow credentials**
7. Click **Save**

> **Note:** The wildcard `https://*.vercel.app` in your config should already cover this, but adding the specific URL is more secure.

#### Step 5: Test Your Deployed Site

Visit your deployed site and verify everything works:

1. **Homepage:** `https://your-project.vercel.app`

   - ✅ Loads correctly with styling
   - ✅ Navigation works

2. **Blog:** `https://your-project.vercel.app/blog`

   - ✅ Displays your blog posts
   - ✅ Can click into individual posts

3. **Sanity Studio:** `https://your-project.vercel.app/studio`
   - ✅ Studio interface loads
   - ✅ Can log in
   - ✅ Can edit/create posts
   - ✅ Changes appear on the blog immediately

**🎉 Congratulations!** You now have a fully deployed portfolio with an embedded CMS!

📖 **Resources:**

- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Sanity CORS Configuration](https://www.sanity.io/docs/cors)
- [Monorepo Deployment on Vercel](https://vercel.com/docs/monorepos)

### ✅ Challenge 1 Checklist

- [ ] Git repository initialized and connected to GitHub
- [ ] Turbo repo structure created
- [ ] Next.js app running
- [ ] Tailwind styling applied
- [ ] Sanity Studio embedded at `/studio` route
- [ ] At least 3 blog posts created
- [ ] Blog list page displays posts
- [ ] Individual post pages work
- [ ] Styling looks professional
- [ ] Code committed to GitHub
- [ ] Portfolio deployed to Vercel
- [ ] Environment variables configured
- [ ] Production site works (including `/studio`)

---

## 🚀 Challenge 2: Task Manager App with Database

**Duration:** 2-3 days  
**Technologies:** Next.js, PostgreSQL, Prisma, Tailwind CSS, Turbo Repo

### Overview

Build a task management application with a PostgreSQL database. This teaches you full-stack development with database operations, API routes, and state management.

> **Note:** This challenge builds on the same `intern-challenges` monorepo from Challenge 1. If you haven't completed Challenge 1 Part 1 (Turbo Repo setup), go back and do that first. You'll be adding the task manager as a second app in your existing workspace.

### Part 1: Setup PostgreSQL & Prisma (1 hour)

#### Step 1: Create New Next.js App

Navigate to your monorepo root and create the task manager app:

```bash
# From wherever you are, go to root
cd ~/intern-challenges  # Adjust path if needed

# Or if you're in apps/portfolio:
cd ../..

# Create task manager app
mkdir -p apps/taskmanager
cd apps/taskmanager
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir
```

#### Step 2: Install Prisma

```bash
pnpm add @prisma/client
pnpm add -D prisma
pnpm dlx prisma init
```

This creates:

- `prisma/schema.prisma` - Database schema
- `.env` - Environment variables

#### Step 3: Configure Database

Update `.env`:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskmanager?schema=public"
```

> **Note:** Replace `password` with your PostgreSQL password. If you don't have PostgreSQL installed, use [Supabase](https://supabase.com/) for a free PostgreSQL database.

#### Step 4: Define Database Schema

Update `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      Status   @default(TODO)
  priority    Priority @default(MEDIUM)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("tasks")
}

enum Status {
  TODO
  IN_PROGRESS
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

#### Step 5: Create Database & Generate Client

```bash
pnpm dlx prisma migrate dev --name init
```

This creates the database and generates the Prisma Client.

#### Step 6: Create Prisma Client Utility

Create `lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

📖 **Resources:**

- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### Part 2: Build API Routes (1.5 hours)

#### Step 1: Create Task API Routes

Create `app/api/tasks/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status || "TODO",
        priority: body.priority || "MEDIUM",
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
```

Create `app/api/tasks/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single task
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

// PATCH update task
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const task = await prisma.task.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
```

#### Step 3: Commit Your Database & API Setup

```bash
git add .
git commit -m "Add Prisma schema and API routes for tasks"
```

📖 **Resources:**

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma CRUD Operations](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

### Part 3: Build the UI (2.5 hours)

#### Step 1: Create Task Components

Create `components/TaskCard.tsx`:

```tsx
"use client";

import { Task } from "@prisma/client";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
};

const priorityColors = {
  LOW: "border-l-green-500",
  MEDIUM: "border-l-yellow-500",
  HIGH: "border-l-red-500",
};

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-l-4 ${priorityColors[task.priority]}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>
      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}
      <div className="flex justify-between items-center">
        <select
          value={task.status}
          onChange={(e) => onUpdate(task.id, e.target.value as Task["status"])}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
```

Create `components/TaskForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Priority } from "@prisma/client";

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    priority: Priority;
  }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
```

#### Step 2: Create Main Page

Update `app/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Task["status"] | "ALL">("ALL");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: {
    title: string;
    description: string;
    priority: Task["priority"];
  }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTask = async (id: string, status: Task["status"]) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with status tracking
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TaskForm onSubmit={createTask} />
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 flex gap-2">
              {(["ALL", "TODO", "IN_PROGRESS", "DONE"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded transition ${
                      filter === status
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {status.replace("_", " ")}
                  </button>
                )
              )}
            </div>

            {loading ? (
              <p className="text-center py-8">Loading tasks...</p>
            ) : filteredTasks.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                No tasks found. Create one to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
```

#### Step 3: Run the App

```bash
pnpm dev
```

Visit `http://localhost:3000` and start managing tasks!

#### Step 4: Commit Your UI

```bash
git add .
git commit -m "Add task manager UI with full CRUD functionality"
```

📖 **Resources:**

- [React Hooks](https://react.dev/reference/react)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Tailwind Components](https://tailwindui.com/components)

### Part 4: Turbo Repo Integration (30 mins)

#### Step 1: Add to Workspace

Update root `package.json` scripts to include the task manager:

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "dev:portfolio": "turbo run dev --filter=portfolio",
    "dev:taskmanager": "turbo run dev --filter=taskmanager"
  }
}
```

#### Step 2: Test Turbo Commands

From the root directory:

```bash
pnpm dev:portfolio    # Run just portfolio (includes embedded Sanity Studio)
pnpm dev:taskmanager  # Run just task manager
pnpm dev              # Run all apps simultaneously
```

> **Note:** If both apps try to use port 3000, Next.js will automatically assign the second app to port 3001.

### Part 5: Deploy to Vercel with Database (1.5 hours)

Deploying the task manager requires a hosted PostgreSQL database. We'll use **Vercel Postgres** (easiest) or **Supabase** (more features).

#### Step 1: Choose Database Provider

**Option A: Vercel Postgres (Recommended for Beginners)**

1. Go to your Vercel project dashboard
2. Click on the **Storage** tab
3. Create a **Postgres** database
4. Vercel automatically adds the connection string to your environment variables

**Option B: Supabase (More Features)**

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to provision (~2 minutes)
4. Go to **Project Settings** → **Database**
5. Copy the **Connection String** (set mode to "Session")

#### Step 2: Update Environment Variables

Create `.env.local` in your task manager app (if not already):

```bash
# For Vercel Postgres (automatically set on Vercel)
POSTGRES_URL="postgres://..."

# OR for Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

Update `lib/prisma.ts` to use the correct env variable:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL || process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

#### Step 3: Add Build Hook for Migrations

Create `package.json` script in `apps/taskmanager`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma migrate deploy && next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

This ensures:

1. Prisma Client is generated
2. Database migrations run before build
3. Next.js app builds

#### Step 4: Push to GitHub

```bash
cd ../..  # Back to root
git add .
git commit -m "Add task manager with database"
git push
```

If you haven't initialized git yet:

```bash
git init
git add .
git commit -m "Initial commit: Task manager with database"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### Step 5: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. **Import your repository**
3. **Configure the project:**

   - Framework Preset: **Next.js**
   - Root Directory: **apps/taskmanager**
   - Build Command: `cd ../.. && pnpm install && pnpm --filter=taskmanager build`
   - Output Directory: `.next`

4. **Add Environment Variables** (if using Supabase):

   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

5. **Add Vercel Postgres** (if using Vercel):

   - Click **Storage** tab
   - Create **Postgres Database**
   - Connect to your project

6. Click **Deploy**

#### Step 6: Verify Deployment

Once deployed:

1. **Check build logs** - ensure migrations ran successfully
2. **Visit your app** - `https://your-taskmanager.vercel.app`
3. **Test functionality:**
   - ✅ Create a new task
   - ✅ Update task status
   - ✅ Delete a task
   - ✅ Filter tasks
4. **Check database** - verify data is persisted:
   - Vercel: Use Vercel's data browser
   - Supabase: Use Supabase Table Editor

#### Step 7: Troubleshooting Common Issues

**Build fails with "Can't reach database server"**

- Check DATABASE_URL is correct
- For Supabase, ensure you're using the "Session" connection string, not "Transaction"
- Verify your database allows connections from `0.0.0.0/0`

**Migrations fail during build**

- Run locally first: `pnpm dlx prisma migrate deploy`
- Check Prisma schema is valid
- Ensure `prisma/migrations` folder is committed to git

**Tasks don't persist after refresh**

- Check browser console for API errors
- Verify environment variables are set in Vercel
- Check Vercel function logs for server errors

#### Step 8: View Live Database (Optional)

**Option 1: Prisma Studio Locally**

Connect to your production database locally:

```bash
cd apps/taskmanager
# Update .env.local with production DATABASE_URL
pnpm dlx prisma studio
```

**Option 2: Vercel Data Browser**

If using Vercel Postgres:

1. Go to your project's **Storage** tab
2. Click on your database
3. Click **Data** to browse tables

**Option 3: Supabase Table Editor**

If using Supabase:

1. Go to your Supabase project
2. Click **Table Editor**
3. Select the `tasks` table

📖 **Resources:**

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment/deployment)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

### ✅ Challenge 2 Checklist

- [ ] PostgreSQL database created
- [ ] Prisma schema defined
- [ ] Database migrations run
- [ ] API routes working (GET, POST, PATCH, DELETE)
- [ ] Task creation works
- [ ] Task status updates work
- [ ] Task deletion works
- [ ] Task filtering works
- [ ] UI is responsive and styled
- [ ] Integrated into turbo repo
- [ ] Production database setup (Vercel Postgres or Supabase)
- [ ] App deployed to Vercel
- [ ] Environment variables configured
- [ ] Production app works with live database

---

## 🎯 Bonus Challenges (Optional)

If you finish early, try these enhancements:

### Portfolio Enhancements

1. ✅**Add Categories** - Create a category system for blog posts
2. ✅**Search Functionality** - Add search to filter blog posts
3. ✅**Dark Mode** - Implement dark mode toggle
4. ✅**Image Support** - Add hero images to blog posts using Sanity's image pipeline

### Task Manager Enhancements

1. ✅**Due Dates** - Add due date field and sorting
2. ✅**User Authentication** - Use [NextAuth.js](https://next-auth.js.org/) for login
3. ✅**Tags/Labels** - Add tagging system for tasks
4. **Task Analytics** - Show completion statistics with charts
5. ✅**Drag & Drop** - Implement drag-and-drop reordering

### Shared Components Package

Create a shared UI library both apps can use:

```bash
mkdir -p packages/ui
cd packages/ui
pnpm init
```

Create shared Button, Card, and Input components that both apps import.

---

## 📚 Additional Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity.io Docs](https://www.sanity.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Turbo Repo Docs](https://turbo.build/repo/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started/quickstart)
- [React Documentation](https://react.dev/)

### Video Tutorials

- [Next.js 14 Tutorial](https://www.youtube.com/results?search_query=nextjs+14+tutorial)
- [Sanity.io Crash Course](https://www.youtube.com/results?search_query=sanity+cms+tutorial)
- [Prisma Tutorial](https://www.youtube.com/results?search_query=prisma+tutorial)

### Community

- [Next.js Discord](https://nextjs.org/discord)
- [Sanity Community](https://www.sanity.io/community)
- [Prisma Slack](https://slack.prisma.io/)

---

## 🏁 Submission Guidelines

When you complete both challenges, submit:

1. **GitHub Repository** - Push your code to a public repository
2. **Live Deployment URLs** - Include links to both deployed apps:
   - Portfolio & Blog: `https://your-portfolio.vercel.app`
   - Task Manager: `https://your-taskmanager.vercel.app`
3. **README** - Include setup instructions and screenshots of both apps
4. **Demo Video** (optional) - 2-3 minute walkthrough
5. **Reflection** - Brief writeup answering:
   - What was most challenging?
   - What did you learn?
   - What would you improve?
   - Which technology did you enjoy most?
   - What surprised you about the deployment process?

### Evaluation Criteria

You'll be evaluated on:

- ✅ **Functionality** - Do both apps work as expected?
- ✅ **Deployment** - Are both apps successfully deployed and working in production?
- ✅ **Code Quality** - Is code clean, readable, and well-organized?
- ✅ **UI/UX** - Is the interface intuitive and visually appealing?
- ✅ **Documentation** - Are setup instructions clear?
- ✅ **Problem Solving** - How did you handle challenges?

---

## 💬 Getting Help

If you get stuck:

1. Check the documentation links provided
2. Search for error messages on Google/Stack Overflow
3. Ask questions in our team Slack (provide specific error messages)
4. Review example code in the resources section

Remember: Getting stuck is part of learning! Don't hesitate to ask for help.

---

**Good luck! We're excited to see what you build! 🚀**
