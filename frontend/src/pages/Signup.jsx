import React from "react";
import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    console.log(firstName, lastName, email, password);

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox  onChange={ e => {
            setFirstName(e.target.value);
        }} placeholder="satej" label={"First Name"} />
        <InputBox onChange={e => {
            setLastName(e.target.value);
        }} placeholder="here" label={"Last Name"} />
        <InputBox onChange={e =>{
            setEmail(e.target.value);
        }} placeholder="satej@gmail.com" label={"Email"} />
        <InputBox onChange={e =>{
           setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick = { async () =>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName,
                lastName,
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
