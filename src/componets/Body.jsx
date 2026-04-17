import React, { useEffect } from "react";
import LogIn from "./LogIn";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import MovieDetails from "./MovieDetails";
import MyList from "./MyList";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/movie/:movieId", // ✅ NEW ROUTE
    element: <MovieDetails />,
  },
  {
    path: "/mylist",
    element: <MyList />,
  },
]);

const Body = () => {
  //const dispatch = useDispatch();

  //this is kind of once place from where i am getiing mu udated user info and updating my redux store accordingly
  //whyonAuthStateCHange in written in very root level and that too at with useEffect.
  // In my reduxStore i have put data about my User.
  // I want this store to be updated based on my current status SIgnIn,SignUp,LogOUt
  // SO I need some kind of event LIstner that will chnge whenver my authentication state changes.
  //Why writting inside UseEffect
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in,
  //       // const uid = user.uid;
  //       const { uid, email, displayName } = user; //extracting info from user object that is cretaed by firebase Login/SignUp APi and send to Onauthstatechange function.
  //       dispatch(addUser({ uid: uid, email: email, displayName: displayName })); //Putting extracted info on redux Store.
  //     } else {
  //       // User is signed out
  //       dispatch(removeUser());
  //     }
  //   });
  // }, []);
  ////WE are transferring this use effect and onauthState chnage into header..SO that its always wtaching login Status,update Redux Store,and browsing between links happens through onauthstate chnage only

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

//Body handels all the routing logic.It itself doesnot have any UI.
//whenever my URL chnages it rerenders.
