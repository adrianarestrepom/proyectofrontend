import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const navigationRoutes = {
    "/friends": "Amigos",
    "/bills": "Gastos",
    "/groups": "Grupos",
};

export const Nav = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <nav>
            <ul className="text-white text-xl font-bold flex justify-around p-2 gap-10">
                {Object.entries(navigationRoutes).map(([path, name]) => (
                    <Link 
                        key={path}
                        to={path}
                        className={`relative ${activeLink === path ? "active" : ""}`}
                    >
                        {name}
                        {activeLink === path && (
                            <FontAwesomeIcon
                                icon={faCaretUp}
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8 md:-mb-12 md:size-12"
                            />
                        )}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};
