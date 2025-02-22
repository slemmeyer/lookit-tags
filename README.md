# Lookit the tags I've found! -- aka Lookit Tags

A web application for extracting and analyzing meta tags from websites.

## Component Structure

The application's UI is organized into modular components, with the main metadata display logic split into focused sections:

```
src/components/MetaResults/
├── components/ # Reusable base components
│ ├── MetadataSection # Wrapper for metadata sections
│ └── TagDisplay # Display for individual meta tags
├── sections/ # Main content sections
│ ├── TitleSection # Page title display
│ ├── MetaTagsSection # Primary meta & OpenGraph tags
│ ├── CardsSection # Twitter cards & Schema.org data
│ └── PreviewsSection # Favicon & preview images
└── types.ts # Shared type definitions
```
Each section is responsible for rendering a specific type of metadata, making the codebase more maintainable and easier to test.

## Features
- Extract meta tags, OpenGraph, Twitter Cards, and Schema.org data
- Preview favicons and social media images
- Dark mode support
- Rate limiting and security protections
- Mobile-responsive design

## Tech Stack
- Next.js 14
- TypeScript
- TailwindCSS
- Cheerio
- Redis (optional)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- Redis (optional)

### Installation

1. Clone the repository

```bash
git clone https://github.com/slemmeyer/lookit-tags.git
cd lookit-tags
```

2. Install dependencies

```bash
pnpm install
```

3. Copy environment variables

```bash
cp .env.example .env.local
```

4. Start development server

```bash
pnpm dev
```

## Development

### Available Scripts

```bash
pnpm dev # Start development server
pnpm build # Build for production
pnpm start # Start production server
```

### Environment Variables

See `.env.example` for required environment variables and their descriptions.

## Deployment

This project is configured for deployment on Vercel.

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy!

### Vercel Configuration

- Framework Preset: Next.js
- Build Command: `pnpm build`
- Install Command: `pnpm install`
- Output Directory: `.next`

## Security

- Rate limiting implemented for API routes
- URL validation and sanitization
- CORS protection
- Security headers configured
- Response size limits
- Private network access prevention

## Performance

- Edge caching support
- Optimized image loading
- Dark mode without flashing
- Efficient meta tag parsing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

