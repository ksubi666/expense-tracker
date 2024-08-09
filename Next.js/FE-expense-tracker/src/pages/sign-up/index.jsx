import { LogoIcon } from "@/components/icon/LogoIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="flex flex-col justify-center items-center w-[384px] gap-10">
        <LogoIcon />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl leading-8 font-semibold text-[#0F172A]">
            Create Geld account
          </h1>
          <p className="text-base font-normal leading-6 text-[#334155]">
            Sign up below to create your Wallet account
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Input
            className="p-4 items-center bg-[#F3F4F6] text-[#A3A3A3] h-12"
            type="text"
            placeholder="Name"
          />
          <Input
            className="p-4 items-center bg-[#F3F4F6] text-[#A3A3A3] h-12"
            type="email"
            placeholder="Email"
          />
          <Input
            className="p-4 items-center bg-[#F3F4F6] h-12"
            type="password"
            placeholder="Password"
          />
          <Input
            className="p-4 items-center bg-[#F3F4F6] text-[#A3A3A3] h-12"
            type="email"
            placeholder="Re-password"
          />
          <Button className="w-full rounded-3xl bg-[#0166FF] h-12 text-xl leading-7 font-normal">
            Sign up
          </Button>
        </div>
        <div className="flex items-center">
          <p>Already have account?</p>
          <Button className="bg-white text-[#0166FF]">Login</Button>
        </div>
      </div>
      <div className="bg-[#0166FF]"></div>
    </div>
  );
};

export default SignupPage;
