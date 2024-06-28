import React from "react";
import { motion } from "framer-motion";

function Button({ onClick, btnText, className=""}) {
  return (
    <motion.button
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      className={`${className} bg-orange-600 rounded-xl py-2 px-5 text-zinc-300 hover:bg-orange-700`}
      onClick={onClick}
    >
      {btnText}
    </motion.button>
  );
}

export default Button;
