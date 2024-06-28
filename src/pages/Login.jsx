import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { authRepository } from "../appwrite/authRepository";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await authRepository.login({ email, password });
      if (session) {
        const userData = await authRepository.getCurrentUser();
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-[3] w-full h-screen">
      <div className="flex items-center justify-center h-full gap-5">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="flex flex-col items-center gap-5 bg-zinc-600/40 rounded-xl px-28 py-16"
        >
          <h1 className="text-center text-[55px] font-bold text-white">
            WELCOME TO DOCS
          </h1>
          <Input
            type="email"
            placeholder="Please enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Please enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button className="w-full" btnText={`Login`} onClick={handleSubmit} />
          {!error && !loading && <p className="invisible">Invisible</p>}
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-white">Loading...</p>}
          <p className="text-white">
            Not Registered?{" "}
            <Link className="text-orange-400" to={"/register"}>
              Register Now
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
