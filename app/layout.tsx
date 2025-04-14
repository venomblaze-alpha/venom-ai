import { Viewport } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Clarity from "@/components/Clarity";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Venom AI Chatbot",
  description:
    "Venom AI Chatbot - Made using Next.js 15 and Vercel AI sdk powered by Groq. Supports multiple models like Gemini, Llama4, Llama3, Deepseek, Qwen, Mixtral",
  metadataBase: new URL("https://venomblaze-ai.vercel.app/"),
  manifest: "/manifest.json",
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "Venom AI Chatbot",
    description:
      "Made with Next.js 15 and powered by Groq. Supports multiple AI models with blazing fast speed.",
    url: "https://venomblaze-ai.vercel.app/",
    siteName: "Venom AI Chatbot",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Venom AI Chatbot Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venom AI Chatbot",
    description:
      "Next.js 15 + Vercel AI SDK + Groq + multiple models. Try the fastest AI chatbot in your browser.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#d03e09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === "production" ? <Clarity /> : null}
      <body className={mont.className + " overflow-hidden"}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="relative h-full w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,105,12,.15),rgba(255,255,255,0))] opacity-0 md:opacity-100"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,105,12,.15),rgba(255,255,255,0))]"></div>

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
