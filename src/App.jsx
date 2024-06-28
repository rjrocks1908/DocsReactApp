import React, { useEffect, useState } from "react";
import Background from "./components/Background";
import { authRepository } from "./appwrite/authRepository.js";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userData = await authRepository.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <main>
        {loader ? <div>Loading...</div> : <Outlet />}
      </main>
    </div>
  );
}

export default App;
