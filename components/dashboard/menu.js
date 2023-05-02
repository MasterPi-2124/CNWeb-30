import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import CNWeb from "@/assets/logo/cnweb-30.png";
import Link from "next/link";
import DropDown from "./dropdown";
import { useTheme } from "next-themes";
import LightIcon from "@/assets/icons/thick/sun.svg";
import DarkIcon from "@/assets/icons/thick/moon.svg";
import AddIcon from "@/assets/icons/thick/add.svg";
import DashboardIcon from "@/assets/icons/thick/dashboard.png";
import ExportIcon from "@/assets/icons/thick/export.svg";
import NotiIcon from "@/assets/icons/thick/notification.svg";
import PreIcon from "@/assets/icons/thick/settings.svg";
import UserIcon from "@/assets/icons/thick/human.svg";

const navButton = [
    {
        text: "New Quiz",
        path: "/new-quiz",
    },
    {
        text: "Dashboard",
        path: "/dashboard",
        subNav: [
            {
                text: "Quizzes",
                path: "/dashboard/quizzes",
            },
            {
                text: "Classes",
                path: "/dashboard/classes",
            }
        ]
    },
    {
        text: "Export",
        path: "/export",
    },
    {
        text: "Notifications",
        path: "/notifications",
    },
    {
        text: "Preferences",
        path: "/preferences",
    }
];

const Menu = ({ currentPath }) => {
    const [isShows, setIsShows] = useState([]);

    useEffect(() => {
        let showArray = navButton.map((_) => {
            return false;
        });
        setIsShows([...showArray]);
    }, []);

    const handleMouseEnter = (button, index) => {
        if (button.subNav) {
            let showArray = [...isShows];
            showArray[index] = true;
            setIsShows([...showArray]);
        }
    };

    const handleMouseLeave = (button, index) => {
        if (button.subNav) {
            let showArray = [...isShows];
            showArray[index] = false;
            setIsShows([...showArray]);
        }
    };

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
                <Image src={LightIcon} alt="sun icon" className="w-7 h-7 invert dark:invert-0" role="button" onClick={() => setTheme('light')} />
            )
        }

        else {
            return (
                <Image src={DarkIcon} alt="moon icon" className="w-7 h-7 invert dark:invert-0" role="button" onClick={() => setTheme('dark')} />
            )
        }
    };

    return (
        <Navbar
            className="menu"
            light
            expand="md"
        >
            <div className="logo flex items-center font-semibold text-2xl">
                <Image
                    src={CNWeb}
                    alt="cnweb logo"
                    className="invert dark:invert-0 h-12 w-12"
                />
                <NavbarBrand href="/" className="text-black dark:text-white">
                    CNWeb-30
                </NavbarBrand>
            </div>
            <div className="menu-bar">
                {navButton.map((button, index) => {
                    return (
                        <div
                            key={index}
                            onMouseEnter={() => {
                                handleMouseEnter(button, index);
                            }}
                            onMouseLeave={() => {
                                handleMouseLeave(button, index);
                            }}
                            className="sub-nav-div"
                        >
                            {!button.subNav ? (
                                <Link
                                    href={button.path}
                                    className="nav-button"
                                    style={{
                                        color: currentPath === button.text && "#C4181A",
                                    }}
                                >
                                    {button.text}
                                </Link>
                            ) : (
                                <Link
                                    href={button.path}
                                    className="nav-button"
                                    style={{
                                        color: currentPath === button.text && "#C4181A",
                                    }}
                                >
                                    {button.text}
                                </Link>
                            )}
                            {button.subNav && (
                                <DropDown
                                    buttonList={button.subNav}
                                    isShow={isShows[index]}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="header-right flex items-center">
                <a className="get-started leading-10 bg-indigo-700 font-thin text-white w-32 items-center text-center">
                    Get Started
                </a>
                {renderThemeChanger()}

            </div>
        </Navbar>
    );
};

export default Menu;