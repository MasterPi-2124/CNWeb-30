import '@/styles/globals.css'
import "@/styles/header.css";
import Script from "next/script"
import localFont from 'next/font/local';
import { ThemeProvider } from "next-themes";

const segoe = localFont({
  src: [
    {
      path: '../assets/fonts/SegoeUI-Bold.woff2',
      weight: '800',
      style: "normal"
    },
    {
      path: '../assets/fonts/SegoeUI-Light.woff2',
      weight: '200',
      style: "normal"
    },
    {
      path: '../assets/fonts/SegoeUI-LightItalic.woff2',
      weight: '200',
      style: "italic"
    },
    {
      path: '../assets/fonts/SegoeUI-Semibold.woff2',
      weight: '600',
      style: "normal"
    },
    {
      path: '../assets/fonts/SegoeUI.woff2',
      weight: '400',
      style: "normal"
    }
  ],
  variable: '--font-segoe',
  fallback: ['ui-sans-serif'],
});

export default function App({ Component, pageProps }) {
  return <ThemeProvider enableSystem={true} attribute="class">
    <div className={`${segoe.variable} font-segoe`}>
      <Component {...pageProps} />
    </div>
  </ThemeProvider>;
}