import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import CNWeb from "../assets/logo/cnweb-30.png";
import Link from "next/link";
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
    return (
        <div
            id="header-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100px",
                zIndex: "10",
                padding: "2rem 5rem",
            }}
        >
            <Navbar light expand="md" style={{ margin: "auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div style={{ display: "flex", gap: "5px" }}>
                        <Image src={CNWeb} height={40} width={40} alt="cnweb logo" />
                        <NavbarBrand style={{ color: "#c4181a", fontWeight: "600", fontSize: "22px" }} href="/">
                            CNWeb-30
                        </NavbarBrand>
                    </div>
                    <div
                        className="header-web"
                        style={{
                            display: "grid",
                            fontSize: "1.5rem",
                            gap: "10px",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            textAlign: "center",
                            position: "relative",
                            width: "70%",
                        }}
                    >
                        {navButton.map((button, index) => {
                            return (
                                <div
                                    key={index}
                                    className="sub-nav-div"
                                >
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
                    <div
                        className="header-mobile"
                    >
                        {/* <DrawerMenu
                            navButton={navButton}
                        /> */}
                    </div>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;
