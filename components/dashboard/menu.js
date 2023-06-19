import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import CNWeb from "@/assets/logo/cnweb-30.png";
import Link from "next/link";
import DropDown from "./dropdown";
import { useTheme } from "next-themes";
import LightIcon from "@/assets/icons/thin/sun.svg";
import DarkIcon from "@/assets/icons/thin/moon.svg";
import AddIcon from "@/assets/icons/thin/add.svg";
import DashboardIcon from "@/assets/icons/thin/dashboard.svg";
import ExportIcon from "@/assets/icons/thin/export.svg";
import NotiIcon from "@/assets/icons/thin/notification.svg";
import PreIcon from "@/assets/icons/thin/settings.svg";
import UserIcon from "@/assets/icons/thin/human.svg";
import QuizIcon from "@/assets/icons/thin/quiz.svg";
import ClassIcon from "@/assets/icons/thin/class.svg";

const navButton = [
    {
        text: "New Quiz",
        path: "/new-quiz",
        img: AddIcon,
    },
    {
        text: "New Class",
        path: "/new-class",
        img: AddIcon,
    },
    {
        text: "Dashboard",
        path: "/dashboard",
        img: DashboardIcon,
        subNav: [
            {
                text: "Quizzes",
                path: "/dashboard/quizzes",
                img: QuizIcon,
            },
            {
                text: "Classes",
                path: "/dashboard/classes",
                img: ClassIcon,
            }
        ]
    },
    {
        text: "Export",
        path: "/export",
        img: ExportIcon,
    },
    {
        text: "Notifications",
        path: "/notifications",
        img: NotiIcon,
    }
];

const Menu = ({ currentPath, minimized }) => {
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
                <div>
                    <Image src={LightIcon} alt="sun icon" className="invert dark:invert-0" role="button" onClick={() => setTheme('light')} />
                    <p>Light Mode</p>
                </div>
            )
        }

        else {
            return (
                <div>
                    <Image src={DarkIcon} alt="moon icon" className="invert dark:invert-0" role="button" onClick={() => setTheme('dark')} />
                    <p>Dark Mode</p>
                </div>
            )
        }
    };

    return (
        <Navbar
            className="menu"
            light
            expand="md"
        >
            <div className="logo flex items-center font-semibold text-xl">
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
                            className="menu-bar-item"
                            style={{
                                background: currentPath === button.text && "rgba(73, 73, 73, 0.595)",
                            }}
                        >
                            <Image src={button.img} />
                            <Link
                                href={button.path}
                                className="nav-button"

                            >
                                {button.text}
                            </Link>
                            {button.subNav && (
                                <DropDown
                                    minimized={minimized}
                                    buttonList={button.subNav}
                                    isShow={isShows[index]}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="menu-down flex items-center">
                <div>
                    <Image src={UserIcon} />
                    <Link
                        href="/account"
                        className="nav-button"
                        style={{
                            color: currentPath === "Account" && "#C4181A",
                        }}
                    >
                        Account
                    </Link>
                </div>
                {renderThemeChanger()}
            </div>
        </Navbar>
    );
};

export default Menu;