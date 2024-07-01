import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { authRepository } from "../appwrite/authRepository";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Loader from "../components/Loader";
import { docsRepository } from "../appwrite/docsRepository";

function getRandomColor() {
  const randomColors = [
    "#3F7CBF",
    "#92C232",
    "#EF5A3A",
    "#A63EE3",
    "#29BCCA",
    "#F8A13D",
    "#6A4BC6",
    "#D23B76",
    "#4FBF7E",
    "#DDA837",
  ];
  const randomIndex = Math.floor(Math.random() * randomColors.length);
  return randomColors[randomIndex];
}

function Foreground() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const onClickLogout = async () => {
    setLoader(true);
    try {
      await authRepository.logout();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const onClickAddDoc = () => {
    setData((prev) => [
      ...prev,
      {
        openDocForm: true,
        title: "",
        description: "",
        filesize: "",
        cardColor: getRandomColor(),
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      const docs = await docsRepository.getDocs();
      setData(docs.documents)

      setLoader(false);
    })();
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full p-5">
          <div className="flex justify-end gap-5 mb-5">
            <Button btnText="Add Doc" onClick={onClickAddDoc} />
            <Button btnText="Logout" onClick={onClickLogout} />
          </div>
          <div className="flex gap-5 flex-wrap">
            {data.length > 0 && data.map((item, index) => (
              <Card key={index} data={item} reference={ref} updateData={setData} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Foreground;
