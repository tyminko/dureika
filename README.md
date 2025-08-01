# Nuxt Portfolio with Markdown Content

A static portfolio website built with Nuxt.js that automatically generates pages from markdown files. Perfect for GitHub Pages deployment.

## Features

- **Markdown-based content**: Write your projects and pages in simple markdown files
- **Automatic page generation**: Each markdown file becomes a page automatically
- **Project grid**: Beautiful grid layout showcasing all your projects
- **Tag filtering**: Filter projects by tags
- **Responsive design**: Works on all devices
- **GitHub Pages ready**: Automatic deployment with GitHub Actions

## How to Use

### 1. Adding New Projects

To add a new project, simply create a new markdown file in the `content/projects/` directory:

```markdown
---
title: My New Project
description: A brief description of the project
image: /images/project-image.jpg
date: 2024-01-15
tags: ['design', 'web', 'creative']
---

# My New Project

Your project content goes here...

## Overview

Describe your project...

## Technologies Used

- Technology 1
- Technology 2
- Technology 3
```

### 2. Required Front Matter

Each project markdown file should have front matter (the section between `---`) with:

- `title`: The project title
- `description`: A brief description (used in project cards)
- `image`: Path to project image (optional)
- `date`: Project date (YYYY-MM-DD format)
- `tags`: Array of tags for filtering

### 3. Adding Regular Pages

For regular pages (like About, Contact, etc.), create markdown files in the `content/` directory:

```markdown
---
title: About
description: About page description
---

# About Page

Your content here...
```

## File Structure

```
content/
├── index.md              # Home page content
├── about.md              # About page
└── projects/
    ├── project-1.md      # Project 1
    ├── project-2.md      # Project 2
    └── ...               # More projects
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run generate

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Go to Settings → Pages
3. Set Source to "GitHub Actions"

### 3. Automatic Deployment

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your site when you push to main
- Deploy to GitHub Pages
- Update the site with any changes

## Customization

### Styling

Edit `assets/css/main.css` to customize the appearance.

### Configuration

Modify `nuxt.config.ts` to change:
- Site title and metadata
- GitHub Pages base URL
- Content module settings

### Adding Features

- **New components**: Add Vue components in the `components/` directory
- **New pages**: Create Vue files in the `pages/` directory
- **New layouts**: Create layout files in the `layouts/` directory

## Workflow

1. **Add content**: Create new markdown files in `content/`
2. **Test locally**: Run `npm run dev` to preview
3. **Commit changes**: `git add . && git commit -m "Add new project"`
4. **Deploy**: Push to GitHub - automatic deployment happens

## Tips

- Use descriptive filenames for your markdown files
- Include relevant tags for better filtering
- Add images to the `public/images/` directory
- Keep descriptions concise for better card display
- Use consistent date formatting (YYYY-MM-DD)

## Troubleshooting

### Build Issues
- Make sure all markdown files have valid front matter
- Check that image paths are correct
- Verify that all required fields are present

### Deployment Issues
- Check GitHub Actions logs for build errors
- Ensure repository has proper permissions
- Verify GitHub Pages is enabled in repository settings

## License

MIT License - feel free to use this template for your own portfolio!
