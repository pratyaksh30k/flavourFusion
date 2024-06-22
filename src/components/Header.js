import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BiSolidUser } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { DrawerExample } from "../constants";


export const title = (
  <a href="/">
    <img className="h-28" alt="logo" src={Logo} />
  </a>
);

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();

  const CartItems = useSelector((store) => store.cart.items); //used to subscribe to the Store.
  console.log(CartItems);

  return (

    <div className="flex justify-between  px-3  overflow-hidden shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]">
      <div className="flex gap-4 items-center ">
        {title}
        <div style={{
          animation:'Flash 1.5s linear infinite',
        }}> {isOnline ? <div className="text-xl text-green-400">✅Online</div> : <div className="text-xl text-red-400">❌offline</div>}</div> 
      </div>
      
      {/* ✅, login and logout button  */}
      <div className="flex items-center gap-4 py-8">
        <div>
          <Link to={"/cart"} className="flex items-center"><BsFillCartFill className="text-[#3cab3c] text-4xl relative"/>
            {CartItems.length}
          </Link>
        </div>

        <div>
          {isLoggedIn ? (
            <Button onClick={()=> {setIsLoggedIn(false)}} colorScheme="white" variant="outline" fontSize={18}  gap={1}>
              <Icon as={BiSolidUser} />
              Log in
            </Button>
          ) : (
            <Button onClick={()=> {setIsLoggedIn(true)}} colorScheme="white" variant="outline" fontSize={18}  gap={1}>
              <Icon as={BiSolidUser}/>
              Log out
            </Button>
          )}
        </div>
        <DrawerExample/>
      </div>
    </div>
  );
};
export default Header;
