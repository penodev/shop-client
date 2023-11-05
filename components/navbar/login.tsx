"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import LabelMenu from "./label-menu";
import toast from "react-hot-toast";

type Props = {};

export default function Login({}: Props) {
  const { loginUser, register } = useUser();
  const router = useRouter();
  const [isLoginVariant, setIsLoginVariant] = useState(true);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async () => {
    if (!!email && !!password) {
      if (isLoginVariant) {
        loginUser(email, password);
      } else {
        register(email, password);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!!email) {
      // forgetPassword(email);
    } else {
      toast.error("Please enter your email");
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-center my-8'>
        <h1 className='text-2xl font-extrabold text-neutral-500'>LOGO</h1>
      </div>
      <div>
        <label className='text-sm'>Email</label>
        <Input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          className='h-12 text-sm mt-2'
          placeholder='Email address'
        />
      </div>
      <div>
        <label className='text-sm'>Password</label>
        <Input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='h-12 text-sm mt-2'
          placeholder='Password'
        />
      </div>
      {isLoginVariant && (
        <div className='flex justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
          peer-disabled:opacity-70 text-fnf-primary'
            >
              Remember me
            </label>
          </div>
          <label
            className='text-sm text-primary cursor-pointer'
            onClick={handleForgotPassword}
          >
            Forgot password?
          </label>
        </div>
      )}
      <Button className='text-white text-sm h-12' onClick={handleSubmit}>
        {isLoginVariant ? "Login" : "Sign up"}
      </Button>
      <p className='text-sm'>
        {isLoginVariant ? "First time using App?" : "Already have an account?"}
        <span
          onClick={() => setIsLoginVariant(!isLoginVariant)}
          className='ml-1 cursor-pointer text-neutral-500 hover:underline'
        >
          {isLoginVariant ? "Create an account" : "Login"}
        </span>
      </p>
      <LabelMenu path='/'>Home</LabelMenu>
      <LabelMenu path='term-and-conditions'>Terms and conditions</LabelMenu>
      <LabelMenu path='contact-us'>Contact us</LabelMenu>
    </div>
  );
}
