import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { APP_CONFIG, SEO_CONFIG } from '@/config/constants';

// Font optimization
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap'
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.PORTFOLIO_TITLE,
    template: `%s | ${APP_CONFIG.AUTHOR}`
  },
  description: APP_CONFIG.PORTFOLIO_DESCRIPTION,
  keywords: SEO_CONFIG.KEYWORDS,
  authors: [{ name: APP_CONFIG.AUTHOR }],
  creator: APP_CONFIG.AUTHOR,
  publisher: APP_CONFIG.AUTHOR,
  
  // Open Graph
  openGraph: {
    type: SEO_CONFIG.OPEN_GRAPH.TYPE,
    locale: SEO_CONFIG.OPEN_GRAPH.LOCALE,
    url: APP_CONFIG.SITE_URL,
    siteName: SEO_CONFIG.OPEN_GRAPH.SITE_NAME,
    title: APP_CONFIG.PORTFOLIO_TITLE,
    description: APP_CONFIG.PORTFOLIO_DESCRIPTION,
    images: [
      {
        url: `${APP_CONFIG.SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.AUTHOR} - Portfolio`,
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.PORTFOLIO_TITLE,
    description: APP_CONFIG.PORTFOLIO_DESCRIPTION,
    creator: `@${APP_CONFIG.GITHUB_USERNAME}`,
    images: [`${APP_CONFIG.SITE_URL}/og-image.jpg`]
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
  
  // Canonical URL
  alternates: {
    canonical: APP_CONFIG.SITE_URL,
  },
  
  // App metadata
  applicationName: APP_CONFIG.PORTFOLIO_TITLE,
  category: 'Portfolio',
  classification: 'Professional Portfolio',
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f59e0b' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' }
  ],
  colorScheme: 'light dark',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${cinzel.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical assets - ARQUIVOS REMOVIDOS PARA EVITAR 404 */}
        {/* <link rel="preload" as="image" href="/medieval-bg.jpg" /> */}
        {/* <link rel="preload" as="font" href="/fonts/fantasy.woff2" type="font/woff2" crossOrigin="anonymous" /> */}
        
        {/* PWA manifest - REMOVIDO PARA EVITAR 404 */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        
        {/* Apple touch icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": APP_CONFIG.AUTHOR,
              "url": APP_CONFIG.SITE_URL,
              "jobTitle": "Frontend Developer",
              "description": APP_CONFIG.PORTFOLIO_DESCRIPTION,
              "alumniOf": "Universidade Federal de Goiás",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Goiânia",
                "addressRegion": "Goiás",
                "addressCountry": "Brazil"
              },
              "sameAs": [
                `https://github.com/${APP_CONFIG.GITHUB_USERNAME}`,
                "https://linkedin.com/in/gabriel-teles-rosa"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Frontend Development",
                "Web Development"
              ]
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen`}
        suppressHydrationWarning
      >
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        <main id="main-content" className="relative">
          {children}
        </main>
        
        {/* Analytics and performance monitoring would go here */}
      </body>
    </html>
  );
}
