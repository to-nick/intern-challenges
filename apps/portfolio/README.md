# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring a blog powered by Sanity CMS, dark mode support, and a clean, professional design.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Blog Integration**: Content managed through Sanity CMS
- **Project Showcase**: Displays projects with descriptions and tech stacks
- **About Page**: Showcases skills and experience
- **Modern UI**: Built with Tailwind CSS and custom components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- A **Sanity** account and project (for blog content)
- **Git** (for version control)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <https://github.com/to-nick/intern-challenges.git>
cd intern-challenges
```

### 2. Install Dependencies

From the root directory:

```bash
pnpm install
```

Or install for the portfolio app specifically:

```bash
cd apps/portfolio
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the `apps/portfolio` directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**How to get your Sanity credentials:**
1. Go to [sanity.io](https://www.sanity.io) and create an account
2. Create a new project
3. Find your Project ID in the project settings
4. Your dataset is usually `production` (or `development` for testing)

### 4. Run the Development Server

From the root directory:

```bash
pnpm dev:portfolio
```

Or from the portfolio directory:

```bash
cd apps/portfolio
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
apps/portfolio/
├── app/
│   ├── about/          # About page
│   ├── blog/           # Blog listing and individual posts
│   ├── projects/       # Projects showcase
│   ├── studio/         # Sanity Studio (CMS interface)
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── navbar.tsx      # Navigation bar
│   ├── footer.tsx      # Footer component
│   ├── blog-search.tsx # Blog search functionality
│   └── ui/             # Reusable UI components
├── lib/
│   ├── sanity.ts       # Sanity client configuration
│   └── utils.ts        # Utility functions
├── sanity/             # Sanity CMS configuration
│   ├── schemas/        # Content schemas
│   └── structure.ts    # Studio structure
└── assets/             # Images and icons
```

## 🎨 Technologies Used

- **Next.js 15.5.4** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Sanity CMS** - Content management
- **next-themes** - Dark mode support
- **Lucide React** - Icons

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. **Configure the project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/portfolio`
   - **Build Command**: `cd ../.. && pnpm install && pnpm --filter=portfolio build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install`

4. **Add Environment Variables:**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION` (optional)

5. **Deploy!**

## 📸 Screenshots

> **Note**: 
> - <img src="/apps//portfolio/readme-screenshots/Lightmode-home.png" >
> - <img src="/apps/portfolio/readme-screenshots/Darkmode-home.png">
> - <img src="/apps/portfolio/readme-screenshots/About.png">
> - <img src="/apps/portfolio/readme-screenshots/projects.png">
> - <img src="/apps/portfolio/readme-screenshots/blogs.png">
> - 

Example structure:
```
![Home Page Light Mode](./screenshots/home-light.png)
![Home Page Dark Mode](./screenshots/home-dark.png)
![About Page](./screenshots/about.png)
![Projects Page](./screenshots/projects.png)
![Blog Page](./screenshots/blog.png)
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📝 Content Management

### Accessing Sanity Studio

1. Start the development server
2. Navigate to `/studio` in your browser
3. Log in with your Sanity credentials
4. Create and manage blog posts

### Creating a Blog Post

1. Go to `/studio`
2. Click "Create new" → "Post"
3. Fill in:
   - Title
   - Slug (URL-friendly version)
   - Author
   - Published date
   - Content (using the rich text editor)
   - Featured image
   - Categories

## 🐛 Troubleshooting

### Images not loading from Sanity
- Ensure `cdn.sanity.io` is in your `next.config.ts` remotePatterns
- Check that your Sanity project ID is correct

### Dark mode not working
- Ensure `ThemeProvider` is wrapping your app in `layout.tsx`
- Check that `next-themes` is installed

### Build errors
- Run `pnpm install` from the root directory
- Clear `.next` folder and rebuild
- Check that all environment variables are set

## 📄 License

This project is private and proprietary.

## 👤 Author

Nick Torrens - Software Engineer

---

For questions or issues, please contact the development team.
