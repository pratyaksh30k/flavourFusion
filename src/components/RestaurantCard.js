import { useContext, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import UsersContext from "../utils/UserContext";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";

const RestaurantCard = ({
  name,
  cuisines,
  avgRating,
  cloudinaryImageId,
  restaurant,
}) => {
  // const {name, cuisines, avgRating, cloudinaryImageId} = restaurant.info;
  const { user } = useContext(UsersContext);
  const [favourate, setFavourate] = useState(false);
  return (
    <div className="w-60 rounded-xl relative transition-all ease-linear duration-200 hover:scale-105 md:hover:scale-110">
      <div className="overflow-hidden rounded-xl ">
        <Link to={"/restaurant/" + restaurant.info.id}>
          <img
            className="h-44 w-full object-cover rounded-xl shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.07)_0px_2px_4px,rgba(0,0,0,0.07)_0px_4px_8px,rgba(0,0,0,0.07)_0px_8px_16px,rgba(0,0,0,0.07)_0px_16px_32px,rgba(0,0,0,0.07)_0px_32px_64px]"
            src={IMG_CDN_URL + cloudinaryImageId}
          />
        </Link>
      </div>
      {!favourate ? (
        <FaRegHeart
          onClick={() => {
            setFavourate(true);
          }}
          className="absolute top-2 right-2 text-2xl text-white"
        />
      ) : (
        <FaHeart
          onClick={() => {
            setFavourate(false);
          }}
          className="absolute top-2 right-2 text-2xl text-white"
        />
      )}
      <div className="p-2">
        <div className="flex justify-between items-center gap-4 text-lg font-bold whitespace-nowrap overflow-hidden">
          <span className="truncate">{name}</span>
          <div className="flex items-center text-center gap-1">
            <FaStar className="text-green-700" />
            <div className="text-base">{avgRating}</div>
          </div>
        </div>

        <h3 className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-500">
          {cuisines.join(", ")}
        </h3>
      </div>
    </div>
  );
};
export default RestaurantCard;
