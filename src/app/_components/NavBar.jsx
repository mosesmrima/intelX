"use client"
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {useTheme} from "next-themes";
import { MdOutlineLightMode, MdOutlineDarkMode  } from "react-icons/md";

export default function NavBar() {
    const {theme, setTheme } = useTheme();


    return (
        <Navbar shouldHideOnScroll={true} isBordered={true} isBlurred={true} className={"justify-end p-4"}>
            <NavbarContent className={"hidden sm:flex gap-4"} justify={"end"}>
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/dashboard">
                        Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/groups" aria-current="page">
                        Groups
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/incidents">
                        Incidents
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        API
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify={"end"} className={"p-4 cursor-pointer"}>
                {theme === "dark"?
                    <MdOutlineLightMode size={24} onClick={() => setTheme('light')}/>:
                    <MdOutlineDarkMode size={24} onClick={() => setTheme('dark')}/> }
            </NavbarContent>
        </Navbar>
    );
}

