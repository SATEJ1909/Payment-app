import React from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/login", {
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }
         catch (error) {
            alert("login failed: " + (err.response?.data?.message || err.message));
    }
}
return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox placeholder="satej@gmail.com" label={"Email"} />
            <InputBox placeholder="123456" label={"Password"} />
            <div className="pt-4">
                <Button  onClick={handleLogin} label={"Sign in"} />
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
    </div>
</div>
}