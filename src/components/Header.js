import { useState } from "react";
import Logo from "../assets/img/logoFoodNetwork.png";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BiSolidUser } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { DrawerExample } from "../constants";
import { PiPlugsConnectedFill } from "react-icons/pi";


export const title = (
  <a href="/">
    <img className="h-16 md:h-20" alt="logo" src={Logo} />
  </a>
);

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();

  const CartItems = useSelector((store) => store.cart.items); //used to subscribe to the Store.
  console.log(CartItems);

  return (

    <div className="flex justify-between px-3 overflow-hidden shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]">
      <div className={`gap-4 items-center ${isOnline && window.innerWidth < 768 ? 'hidden md:flex' : 'flex'}`}>
        <div> {isOnline ? <div className="text-xl text-green-700 flex items-center"><PiPlugsConnectedFill/>Online</div> : <div className="text-xl text-red-700">❌offline</div>}</div> 
      </div>
      <div className="md:ml-20 my-auto">{title}</div>
      {/* ✅, login and logout button  */}
      <div className="flex items-center gap-1 md:gap-4 py-8">
        <div className="">
        <Link to={"/cart"} className="items-center relative"><BsFillCartFill className="text-green-700 text-4xl relative"/>
            <span className="absolute top-0 right-0 bg-white text-green-700 border border-solid border-green-700 text-sm font-semibold rounded-full w-5 h-5 flex justify-center items-center">{CartItems.length}</span>
          </Link>
        </div>

        <div>
          {isLoggedIn ? (
            <div onClick={()=> {setIsLoggedIn(false)}} className="flex items-center text-black bg-white font-bold gap-1">
              <Icon as={BiSolidUser} />
              <div className="md:text-lg text-sm">Log in</div>
            </div>
          ) : (
            <div onClick={()=> {setIsLoggedIn(true)}} className="flex items-center text-black bg-white font-bold gap-1 border border-solid border-black py-2 px-2 rounded-md md:px-4">
              <Icon as={BiSolidUser} />
              <div className="md:text-lg text-sm">Log Out</div>
            </div>
          )}
        </div>
        <DrawerExample/>
      </div>
    </div>
  );
};
export default Header;
