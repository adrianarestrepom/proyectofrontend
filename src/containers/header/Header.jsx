// import { Link } from "react-router-dom";
// import Logo from "../../assets/Logo.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { Nav } from "../../components/Nav";
// import { useState, useEffect } from "react";

// const Header = () => {
//   const [isMobile, setIsMobile ] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 788);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//     }, []);

//     const renderNav = () => (
//       <Nav className={isMobile ? "sm:hidden" : "hidden sm:flex"} />
//     );

//     return (
//       <header className="bg-coffee font-fredoka sticky top-0 z-5 w-full">
//         <div className="w-full flex justify-between p-4">
//           <Link to="/home" className="flex items-center">
//             <img src={Logo} alt="Vaquita" className="size-12"/>
//             <h1 className="text-white font-bold pl-3 text-xl"> Mi Vaquita </h1>

//           </Link>
//           {!isMobile && renderNav()}
//           <Link to="/">
//             <div className="flex">
//               <FontAwesomeIcon
//               icon={faUserCircle}
//               className="text-white p-2 size-8"
//               />
//             </div>
//           </Link>
//         </div>
//         {isMobile && renderNav()}
//       </header>
//     );
// };

// export default Header













// import React from 'react';
// import Logo from '../../assets/Logo.svg';


// function HeaderComponent() {
//  return (
//     <header className="grid bg-coffee font-fredoka text-white font-bold relative">
//       <div className="sm:col-span-3 flex items-center gap-3 content-between">
//       <img src={Logo} className="size-12" />
//         <h1 className="">Mi Vaquita</h1> 
        
//       </div>
//       <nav className="sm:col-span-3 flex justify-center gap-5">
//         <button className="">Amigos</button>
//         <button className="">Gastos</button>
//         <button className="">Grupos</button>
//       </nav>
//     </header>
//  );
// };

// export default HeaderComponent;