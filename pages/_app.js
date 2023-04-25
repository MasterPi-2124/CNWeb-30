import '@/styles/globals.css'
import "@/styles/header.css";
// import "@/styles/Mainpage.css";
// import "@/styles/Stakingpage.css";
// import "@/styles/AboutUs.css";
// import "@/styles/Services.css";
// import "@/styles/Resource.css";
// import "@/styles/Upgrade.css";
// import "@/styles/Blogs.css";
// import "@/styles/Blogs-Responsive.css";
// import "@/styles/Consulting.css";
// import "@/styles/Learn.css";
// import "@/styles/Footer.css";
import Script from "next/script"

export default function App({ Component, pageProps }) {
  return <>
    <script src={`https://www.googletagmanager.com/gtag/js?id=G-W11KMCKWJB`}></script>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W11KMCKWJB', {
        page_path: window.location.pathname,
        });
      `,
      }}
    />
    <Component {...pageProps} />
  </>;
}