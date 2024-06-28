import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import {filterData} from "../utils/helper"
import useOnline from "../utils/useOnline";
import { jsondata } from "../Restaurant_list";

const Body= () => {
    const [allRestaurants, setAllRestaurants]= useState([]);
    const [filteredRestaurants, setFilteredRestaurants]= useState([]);
    const [searchText,setSearchText]= useState("");
    
    useEffect(()=>{
        getRestaurants(); 
    },[])

    async function getRestaurants(){
        // const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json=jsondata;
        console.log("bhavesh",json); 
        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    console.log(allRestaurants);
    const isOnline = useOnline();    //created a useOnline custom hook which returns true or false
    console.log(isOnline);
    if(!isOnline){
        return <h1>🔴 You are offline, Plz check your internet connection</h1>
    }   

    if(!allRestaurants) return null;
    
    return (allRestaurants.length===0)? <Shimmer/> :(
        <>
            {console.log(allRestaurants.length)}
            <div className="flex flex-col font-bold text-center">
                <span className="text-4xl md:text-6xl my-6 bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent md:hover:text-7xl transition-all ease-in duration-300">Welcome to Food Network</span>
                <span className="text-base md:text-2xl mb-4 text-gray-500 md:hover:text-3xl transition-all ease-in duration-300">Destination for all your last minute cravings.</span>
            </div>
            <div className="mt-2 mb-5 flex justify-center gap-2 px-4">
                <input
                    type="text"
                    className="border border-solid border-gray-500 rounded-md w-3/4 md:w-2/5 md:p-1 text-sm h-8 md:h-10 font-semibold focus: outline-none"
                    placeholder="ex: The Filter Coffee"
                    value={searchText}
                    onChange={(e)=>{
                        return setSearchText(e.target.value);
                    }}
                />
                <button className="text-white bg-black hover:bg-gray-700 focus:outline-none font-semibold space-x-1 rounded-md px-4 py-1 md:px-5 md:py-2 text-center duration-200" onClick={()=>{
                    const data=filterData(searchText,allRestaurants);
                    return setFilteredRestaurants(data);
                }}>Search</button>
            </div>   
            
            <div className="flex flex-wrap gap-10 justify-center mx-2">
                {
                    (filteredRestaurants.length===0)? <h1>No restaurants found...!!</h1> : filteredRestaurants.map((Restaurant)=>{
                        return  <RestaurantCard key={Restaurant.info.id} restaurant={Restaurant} {...Restaurant.info} />
                    }) 
                }
            </div>
        </>
    );
};
export default Body; 