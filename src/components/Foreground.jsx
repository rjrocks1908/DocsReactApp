import React, { useRef, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { authRepository } from "../appwrite/authRepository";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Foreground() {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const data = [
    {
      desc: "This is a description of the file you are downloading",
      filesize: ".9mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "green",
      },
    },
    {
      desc: "This is a description of the file you are downloading",
      filesize: ".9mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "blue",
      },
    },
    {
      desc: "This is a description of the file you are downloading",
      filesize: ".9mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "green",
      },
    },
  ];

  const onClickLogout = async () => {
    try {
      await authRepository.logout();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  useState();
  return (
    <>
      <div></div>
      <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full p-5">
        <div className="flex justify-end gap-5 mb-5">
          <Button btnText="Logout" onClick={onClickLogout} />
        </div>
        <div className="flex gap-10 flex-wrap">
          {data.map((item, index) => (
            <Card key={index} data={item} reference={ref} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Foreground;
