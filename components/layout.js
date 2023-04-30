import React, { useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

const Layout = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={
        { opacity: 1, y: 0 }
      }
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: props.page === "home" ? 1.6 : 0.6 }}
      ref={props.currentRef || null}
      style={{
        height: "100%",
      }}
    >
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <div
        style={{
          height: "100%",
        }}
      >
        {props.children}
      </div>
    </motion.div>
  );
};
export default Layout;

