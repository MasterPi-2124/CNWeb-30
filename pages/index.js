import Image from 'next/image'
import Header from "@/components/header";
import Layout from '@/components/layout';
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import Abstract from "@/assets/imgs/abstract.jpg"
import DottedMap from "@/assets/imgs/dotted-map.svg"
import { m, transform } from 'framer-motion';

export default function Home() {
  return (
    <Layout pageTitle="Home | CNWeb">
      <Header currentPath={"Home"} />
      <main className="bg-[#212121] min-h-screen items-center justify-between homepage">
        <div className='heading'>
          <Image
            src={Abstract}
            style={{
              position: "absolute",
              right: '0px',
              bottom: '0px',
              width: "90%",
              transform: "rotate(180deg)"
            }}
          />
          <h1>
            Manage your classrooms in an easiest way ever
          </h1>
          <Link href="/dashboard">
            Get started
          </Link>

        </div>

        <div className='how-it-works anchor' id="how-it-works">
          <div className='background'>
            <Image
              src={DottedMap}
            />
            <div className='gradient-filter'></div>
          </div>
          <h1>How It Works</h1>
          <p>When a new quiz is created, teacher's location will also included in the quiz, and it will also look for student's current location to check if that student is in a class or not. </p>
        </div>
        <div className='project anchor' id="project">
          <h1>Project</h1>
          ahoho
        </div>
        <div className='about-us anchor' id="about-us">
          <h1>About Us</h1>
          ahaha
        </div>

      </main>
    </Layout>
  );
}