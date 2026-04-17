import React, { useState, useRef } from "react";
import Header from "./Header";
import { CheckValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  //Toggle Form Handler
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  //Submit Button Handler
  const [errorMessage, setErrorMessage] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const handleButtonClick = () => {
    //validate the user
    const message = CheckValidData(
      emailRef.current.value,
      passRef.current.value,
    );
    setErrorMessage(message);
    if (message) return; //some error has accure youn must stop and return

    //Sign Up or Sign In user
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        //this api takes our email and pass through from and give registerd user object
        auth,
        emailRef.current.value,
        passRef.current.value,
      ) //(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          //If you are here that means you have successfully signed in .And you have now user object with your info
          //From here  you can perform any operation that you wanted to do after signing up
          // console.log(user); //this is the user object that firebase has given me on submitting the form
          //i am updating userObject created by firebase beacuse signIn api dont allow that to fill name there
          //so i am using other firbase api
          //i can do anyOperation agter successful signUp
          ////
          updateProfile(auth.currentUser, {
            displayName: nameRef?.current?.value,
          })
            .then(() => {
              // Profile updated!

              // navigate("/browse"); //if user signed in goto /browse page

              //The problem is when i SignUP for the first time ..After that a User object is created by firebase
              //and as sson as user object is created ..it trifggers OnAuthState chnage that updated our store..
              //Now our redux store contains uid and email nut NOt Display name.
              //SO with update Profile APi i am updating it.
              //But how would my Redus store will be updated ..Becuase updaing store responsibility is on OnauthState chnage..
              //AND that not get triggerd ..
              //So we manually need to update The redux Store with Redux FUnctions
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName }),
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          ////// here update userprofile Api ends

          //Here also You can perform any Action that you want after sucessful login
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage || errorCode) {
            setErrorMessage(" Try again with valid email");
          }
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value,
      )
        .then((userCredential) => {
          //Thsi API takes our info match with data base if sucessful give user object with all our data.
          const user = userCredential.user;
          // console.log(user); //this is the user object that firebase has given me on Signing in.
          //navigate("/browse"); //if user signed in goto /browse page
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage || errorCode) {
            setErrorMessage("Invalid email or password");
          }
        });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Header */}
      <Header />

      {/* Backgrand Image*/}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg"
        alt="background-logo"
        className="absolute top-0 left-0  inset-0 w-full h-full object-cover"
      />

      {/* Overay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 md:p-12 p-6  md:w-4/12 w-11/12 rounded-md  flex flex-col"
      >
        <h1 className="text-white md:text-3xl  text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && ( //this field only for Sign Up
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 bg-gray-700 text-white rounded-sm outline-none md:text-base text-sm "
          />
        )}

        <input
          ref={emailRef}
          type="email"
          placeholder="Email or phone number"
          className="p-3 my-4 bg-gray-700 text-white rounded-sm outline-none  md:text-base text-sm"
        />

        <input
          ref={passRef}
          type="password"
          placeholder="Password"
          className="p-3 my-4 bg-gray-700 text-white rounded-sm outline-none  md:text-base text-sm"
        />

        {errorMessage && (
          <p className="p-3 text-red-700 font-semibold">{errorMessage}</p>
        )}

        {/* Submit Button */}

        <button
          className="p-3 my-4  bg-red-600 text-white rounded-sm font-semibold hover:bg-red-700 cursor-pointer md:text-base text-sm"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle button SignIn to SignUp */}

        <p
          className="p-4 mb-4 text-gray-400 cursor-pointer text-sm"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? (
            <>
              New to Netflix?
              <span className="text-white  font-semibold hover:underline">
                {" "}
                Sign Up Now{" "}
              </span>
            </>
          ) : (
            <>
              Already a User?
              <span className="text-white font-semibold hover:underline">
                {" "}
                Sign In Now
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LogIn;

