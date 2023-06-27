import Image from 'next/image'
import Header from "@/components/header";
import Layout from '@/components/layout';
import Link from 'next/link';
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";

import { projects } from '@/assets/data/projects';
import Abstract from "@/assets/imgs/abstract.jpg";
import DottedMap from "@/assets/imgs/dotted-map.svg";
import Filter from "@/assets/imgs/filter.svg";
import Tech_1 from "@/assets/imgs/tech-1.svg";
import Tech_2 from "@/assets/imgs/tech-2.png";
import Tech_3 from "@/assets/imgs/tech-3.png";
import Tech_4 from "@/assets/imgs/tech-4.png";

export default function Home() {
  return (
    <ParallaxProvider>
      <Layout pageTitle="Home | CNWeb">
        <Header currentPath={"Home"} />
        <main className="bg-[#111111] min-h-screen items-center justify-between homepage">
          <div className='heading'>
            <ParallaxBanner
              layers={
                [
                  {
                    children: (
                      <Image
                        src={Abstract}
                        alt="an abstract image"
                        style={{
                          position: "absolute",
                          right: '0px',
                          bottom: '0px',
                          width: "90%",
                          transform: "rotate(180deg)",
                        }}
                      />
                    ),
                    speed: -15,
                    shouldAlwaysCompleteAnimation: true,
                  }
                ]
              }
              style={{
                width: "100%",
                height: "100%",
                position: "relative"
              }}
            >
              <h1>
                Manage your classrooms in an easiest way ever
              </h1>
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </ParallaxBanner>
          </div>

          <div className='how-it-works anchor' id="how-it-works">
            <ParallaxBanner
              layers={
                [
                  {
                    children: (
                      <div className='background'>
                        <Image
                          alt="a map"
                          src={DottedMap}
                          className="dotted-map"
                        />
                        <Image
                          alt="filter"
                          src={Filter}
                          className="filter-image"
                        />
                      </div>
                    ),
                    speed: -15,
                    shouldAlwaysCompleteAnimation: true,
                  },
                  {
                    children: (
                      <>
                        <h1>How It Works</h1>
                        <p>
                          When a new quiz is created, teacher&apos;s location will be included in the quiz,
                          and it will also look for student&apos;s current location to check if that student is
                          in a class or not.
                        </p>
                      </>
                    ),
                    speed: 25,
                    shouldAlwaysCompleteAnimation: true,
                  }
                ]
              }
              style={{
                width: "100%",
                height: "100%",
                position: "relative"
              }}
            />
          </div>

          <div className='project anchor' id="project">
            <h1>Project</h1>
            <p>
              We use NextJS and ExpressJS for the front-end and back-end code,
              which is hosted in Hetzner servers and proxied behind Nginx and Cloudflare.
            </p>
            <ParallaxBanner
              className='techs'
              layers={
                [
                  {
                    children: (
                      <div className='techs'>
                        {projects.map((project, index) => (
                          <Link href={project.link} key={index}
                          >
                            <Image
                              alt="tech we used"
                              src={project.logo}
                              width={200}
                              height={200}
                            />
                          </Link>
                        )
                        )}
                      </div>
                    ),
                    // speed: -15,
                    translateX: [-40, 0],
                    shouldAlwaysCompleteAnimation: true,
                  }
                ]
              }
              style={{
                height: "100px",
                marginTop: "30px",
              }}
            />

            <ParallaxBanner
              className='diagram'
              layers={[
                {
                  children: (
                    <Image
                      className='tech-1'
                      alt="tech we used"
                      src={Tech_1}
                    />
                  ),
                  translateY: [25, -20],
                  shouldAlwaysCompleteAnimation: true,
                },
                {
                  children: (
                    <Image
                      className='tech-2'
                      alt="tech we used"
                      src={Tech_2}
                    />
                  ),
                  translateY: [45, -30],
                  shouldAlwaysCompleteAnimation: true,
                },
                {
                  children: (
                    <Image
                      className='tech-3'
                      alt="tech we used"
                      src={Tech_3}
                      onClick={() =>
                        window.open(
                          `https://github.com/MasterPi-2124/CNWeb30-Backend`
                        )}
                    />
                  ),
                  translateY: [70, -40],
                  shouldAlwaysCompleteAnimation: true,
                },
                {
                  children: (
                    <Image
                      className='tech-4'
                      alt="tech we used"
                      src={Tech_4}
                      onClick={() =>
                        window.open(
                          `https://github.com/MasterPi-2124/CNWeb-30`
                        )}
                    />
                  ),
                  translateY: [100, -70],
                  shouldAlwaysCompleteAnimation: true,
                }
              ]
              }
              style={{
                width: "100%",
                height: "100%",
                position: "relative"
              }}
            />
          </div>

          <div className='about-us anchor' id="about-us">
            <h1>About Us</h1>
            ahaha
          </div>

        </main>
      </Layout>
    </ParallaxProvider>
  );
}