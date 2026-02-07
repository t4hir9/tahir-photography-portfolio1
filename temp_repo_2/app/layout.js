import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Abdullahi Tahir Adamu",
    default: "Abdullahi Tahir Adamu | React Developer & Cinematographer Nigeria",
  },
  description:
    "React developer and video editor in Nigeria with 6+ years of experience. Freelance Next.js developer specializing in Web3 interfaces, responsive web apps, and professional cinematography. Frontend developer for hire with media production expertise.",
  keywords: ["React developer Nigeria", "Next.js developer freelance", "Frontend developer Web3", "Video editor cinematographer", "Web developer Nigeria", "Professional video editing", "React and Next.js specialist", "Frontend developer for hire"],
  metadataBase: new URL("https://tahiradamu.info"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "Abdullahi Tahir Adamu | Front-End Developer & Media Expert",
    description:
      "Abdullahi Tahir Adamu is a skilled Front-End Developer and Media Expert from Nigeria, specializing in React, Next.js, JavaScript, and creating user-friendly, responsive web applications.",
    url: "https://tahiradamu.info",
    siteName: "Abdullahi Tahir Adamu Portfolio",
    images: [
      {
        url: "https://tahiradamu.info/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullahi Tahir Adamu Portfolio - Front-End Developer & Media Expert",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullahi Tahir Adamu | Front-End Developer & Media Expert in Nigeria",
    description:
      "Portfolio of Abdullahi Tahir Adamu, a Front-End Developer and Media Expert from Nigeria, specializing in React, Next.js, and media solutions.",
    images: ["https://tahiradamu.info/og-image.png"],
    creator: "@iamt4hir9",
  },
  authors: [
    {
      name: "Abdullahi Tahir Adamu",
      url: "https://tahiradamu.info",
    },
  ],
  icons: {
    icon: "/whitelogo.png",
    apple: "/whitelogo.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdullahi Tahir Adamu",
    jobTitle: "Front-End Developer and Media Expert",
    url: "https://tahiradamu.info",
    sameAs: [
      "https://www.linkedin.com/in/iamt4hir9/",
      "https://github.com/t4hir9",
      "https://instagram.com/iamt4hir9",
      "https://twitter.com/iamt4hir9",
    ],
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Web Development",
      "Photography",
      "Videography",
      "Social Media Marketing",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelancer",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nigeria",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-[80vh]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
