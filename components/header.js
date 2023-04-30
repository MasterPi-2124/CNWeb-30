import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import CNWeb from "@/assets/logo/cnweb-30.png";
import LightIcon from "@/assets/icons/sun-fill.svg";
import DarkIcon from "@/assets/icons/moon-fill.svg";
import Link from "next/link";
import { useTheme } from "next-themes";
// import DrawerMenu from "./Drawer";

const navButton = [
    {
        text: "How It Works",
        path: "/how-it-works",
    },
    {
        text: "Project",
        path: "/project",
    },
    {
        text: "About Us",
        path: "/about-us",
    },
];

const Header = ({ currentPath }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])
    const { systemTheme, theme, setTheme } = useTheme();
    const renderThemeChanger = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <Image src={LightIcon} className="w-10 h-10 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
            )
        }

        else {
            return (
                <Image src={DarkIcon} className="w-10 h-10 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
            )
        }
    };

    return (
        <Navbar
            className="header-container relative w-full h-30 z-10"
            light
            expand="md"
        >
            <div className="container flex justify-between w-full">
                <div className="logo">
                    <Image
                        src={CNWeb}
                        alt="cnweb logo"
                        className="invert dark:invert-0"
                    />
                    <NavbarBrand href="/" className="text-black dark:text-white">
                        CNWeb-30
                    </NavbarBrand>
                </div>
                <div className="nav-bar">
                    {navButton.map((button, index) => {
                        return (
                            <div key={index} className="sub-nav-div">
                                <Link
                                    href={button.path}
                                    className="nav-button"
                                    style={{
                                        color: currentPath === button.text && "#C4181A",
                                    }}
                                >
                                    {button.text}
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="header-right">
                    <a className="get-started">
                        Get Started
                    </a>
                    {renderThemeChanger()}
                    {/* <div className="header-mobile">
                    <DrawerMenu
                            navButton={navButton}
                        />
                    </div> */}

                </div>

            </div>
        </Navbar>
    );
};

export default Header;
