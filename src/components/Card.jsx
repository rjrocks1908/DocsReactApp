import React, { useEffect, useRef, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { docsRepository } from "../appwrite/docsRepository";
import Loader from "./Loader";

function convertSizeInMB(size) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function Card({ data, reference, updateData }) {
  const { register, handleSubmit } = useForm();

  const titleInputRef = useRef(null);
  const [fileName, setFileName] = useState("Upload File");
  const { ref, ...rest } = register("title", { required: true });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (data.openDocForm && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [data.openDocForm]);

  const onSubmit = async (formData) => {
    setLoader(true);
    const { title, description, file } = formData;
    const image = file[0];

    const newFile = await docsRepository.uploadDoc(image);
    if (newFile) {
      const newFileId = newFile.$id;
      const newDoc = await docsRepository.createDoc({
        title,
        description,
        filesize: convertSizeInMB(newFile.sizeOriginal),
        fileId: newFileId,
        cardColor: data.cardColor,
      });
      updateData((prevData) => {
        const data = prevData.filter((item) => item.$id);
        return [...data, newDoc];
      });
    }
    setLoader(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
    }
  };

  const downloadDocument = () => {
    const file = docsRepository.downloadFile(data.file);
    console.log(file);
  };

  const handleDelete = async () => {
    setLoader(true);
    if (data.openDocForm) {
      updateData((prevData) => prevData.filter((item) => !item.openDocForm));
      return;
    }
    await docsRepository.deleteDoc(data.$id);
    await docsRepository.deleteFile(data.file);
    updateData((prevData) => prevData.filter((item) => item.$id !== data.$id));
    setLoader(false);
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={1}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
      className="relative flex-shrink-0 w-60 h-80 rounded-[45px] bg-zinc-900/90 text-white py-8 px-8 overflow-hidden"
    >
      {loader && <Loader />}
      <div className="flex justify-between">
        <FaRegFileAlt />
        <IoClose className="cursor-pointer" onClick={handleDelete} />
      </div>
      {data.openDocForm ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              ref={(e) => {
                ref(e);
                titleInputRef.current = e;
              }}
              type="text"
              className="w-full resize-none outline-none bg-zinc-800 rounded-md p-2 text-white mt-3"
              placeholder="Title"
              {...rest}
            />
            <textarea
              className="w-full h-[100px] resize-none outline-none bg-zinc-800 rounded-md p-2 text-white mt-2"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            <div className="footer absolute bottom-0 w-full left-0">
              <div className="flex items-center justify-between mb-3 px-8 relative">
                <label
                  htmlFor="file"
                  className="cursor-pointer w-[60%] truncate"
                >
                  {fileName}
                  <div className="text-sm opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center bg-zinc-900 border border-white rounded-md text-white font-semibold">
                    {fileName}
                  </div>
                </label>
                <div className="relative inline-block">
                  <input
                    id="file"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="w-6 h-6 opacity-0 absolute inset-0 z-20 cursor-pointer"
                    {...register("file", { required: true })}
                    onChange={handleFileChange}
                  />
                  <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer z-10">
                    <IoCloudUploadSharp size=".7em" color="white" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`tag w-full py-4 flex items-center justify-center text-sm font-semibold text-white`}
                style={{
                  backgroundColor: data.cardColor,
                }}
              >
                Save
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-2">{data.title}</h2>
          <p className="text-sm leading-tight mt-2 font-semibold">
            {data.description}
          </p>
          <div className="footer absolute bottom-0 w-full left-0">
            <div className="flex items-center justify-between mb-3 px-8">
              <h5>{data.filesize}</h5>
              <span className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center">
                <LuDownload size=".7em" color="white" />
              </span>
            </div>
            <button
              onClick={downloadDocument}
              className={`tag w-full py-4 flex items-center justify-center text-sm font-semibold text-white`}
              style={{
                backgroundColor: data.cardColor,
              }}
            >
              Download Now
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Card;
