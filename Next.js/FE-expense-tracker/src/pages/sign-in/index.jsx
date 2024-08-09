import { LogoIcon } from "@/components/icon/LogoIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
const SigninPage = () => {
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="flex flex-col justify-center items-center w-[384px] gap-10">
        <LogoIcon />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl leading-8 font-semibold text-[#0F172A]">
            Welcome Back
          </h1>
          <p className="text-base font-normal leading-6">
            Welcome back, Please enter your details
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Input
            className="p-4 items-center bg-[#F3F4F6]"
            type="email"
            placeholder="Email"
          />
          <Input
            className="p-4 items-center bg-[#F3F4F6]"
            type="password"
            placeholder="Password"
          />
          <Button className="w-full rounded-3xl bg-[#0166FF]">Log in</Button>
        </div>
        <div className="flex items-center">
          <p>Don’t have account?</p>
          <Button className="bg-white text-[#0166FF]">Sign up</Button>
        </div>
      </div>
      <div className="bg-[#0166FF]"></div>
    </div>
  );
};

export default SigninPage;
