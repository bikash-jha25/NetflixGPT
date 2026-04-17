

import React, { useEffect } from "react";
import netflixlogo from "../assets/netflix-logo.png";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptContainerView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/languageSlice";
import { supportedLangArray } from "../utils/languageConstants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); //this is the entire user object from userSlice Store
  const showGptContainer = useSelector((store) => store.gpt.showGptContainer); //if i am GPT Page => true

  //Language change Handler
  const handleOnchangeSelect = (e) => {
    //getting the value of select here
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  //accessing current language of store
  const selectedLang = useSelector((store) => store.language.lang); //store -> ministore -> Data Structure

  //toggle Gpt Container and browse page.
  const handleGptContainerClick = () => {
    dispatch(toggleGptContainerView());
  };

  //OnAuthStateChnage for routing,Redux Store Update,authentication status
  //we put it on anycomponent that is at very root level or that is always present in our app.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in,
        // const uid = user.uid;
        const { uid, email, displayName } = user; //extracting info from user object that is cretaed by firebase Login/SignUp APi and send to Onauthstatechange function.
        dispatch(addUser({ uid: uid, email: email, displayName: displayName })); //Putting extracted info on redux Store updating the store.
        navigate("/browse"); //navigating by authentication system
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/"); //navigating by authentication system
      }
    });

    //this is a type of hygine practice
    //when my header component unmounts remove the event listener OnAuthStateChnage
    return () => unsubscribe();
  }, []);

  //SignOut Handler
  const handleSignOut = () => {
    //Sign Out Logic
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //on authstatechnage called after status chnages => it sends null user object.
        //navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute top-0 left-0 z-20 flex w-full justify-between bg-linear-to-b from-black md:px-10 px-3 py-3">
      {/* MAIN CONTAINER */}
      <div className="flex items-center md:gap-8 gap-3 flex-wrap">
        <img
          src={netflixlogo}
          alt="logo"
          onClick={() => navigate("/browse")}
          className="md:w-44 w-24 cursor-pointer hover:scale-105 transition"
        />

        {user && (
          <div className="md:flex md:items-center md:gap-6 md:ml-6 flex gap-4 ">
            {/* HOME */}
            <button
              onClick={() => navigate("/browse")}
              className="relative text-white md:text-lg text-sm font-medium group cursor-pointer"
            >
              Home
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </button>

            {/* MY LIST */}
            <button
              onClick={() => navigate("/mylist")}
              className="relative text-white  md:text-lg text-sm font-medium group cursor-pointer"
            >
              My List
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-nowrap md:flex-wrap justify-end w-full md:w-auto">
        {showGptContainer && (
          <select
            //value={selectedLang}
            onChange={handleOnchangeSelect}
            className="bg-red-700 md:mt-3 mt-3  text-white md:px-4 px:2 md:py-2 py-1 md:text-sm text-xs rounded-lg font-medium hover:bg-red-700 cursor-pointer"
          >
            {supportedLangArray.map((langObj) => (
              <option key={langObj.identifier} value={langObj.identifier}>
                {langObj.name}
              </option>
            ))}
          </select>
        )}

        {user && (
          <button
            className="relative md:mt-3 mt-3 md:px-4 px-2 md:py-2  py-1 md:text-sm text-xs  overflow-hidden font-medium rounded-lg shadow-2xl group cursor-pointer"
            onClick={handleGptContainerClick}
          >
            <span className="ease absolute top-0 left-0 h-40 w-40 -mt-10 -ml-3 rounded-full bg-red-700 blur-md transition-all duration-700"></span>
            <span className="absolute inset-0 h-full w-full transition duration-700 ease group-hover:rotate-180">
              <span className="absolute bottom-0 left-0 h-24 w-24 -ml-10 rounded-full bg-gray-600 blur-md"></span>
              <span className="absolute right-0 bottom-0 h-24 w-24 -mr-10 rounded-full bg-gray-900 blur-md"></span>
            </span>
            <span className="relative text-white">
              {showGptContainer ? "BROWSE 🎬" : "AI MODE ⚡"}
            </span>
          </button>
        )}

        {user && (
          <button
            className="bg-red-700 md:mt-3 mt-3 text-white md:px-4  px-2 md:py-2  py-1 md:text-sm text-xs rounded-lg font-medium hover:bg-red-700 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

