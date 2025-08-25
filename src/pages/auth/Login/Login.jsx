import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Checkbox, Label, TextInput, Radio, Alert } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import AppButton from "../../../components/shared/AppButton/AppButton";
import { HiInformationCircle } from "react-icons/hi";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {Helmet} from "react-helmet";


  const URL = `${import.meta.env.VITE_BASE_URL}/users/signin`;
  const defaultValues = {
      email:"",
      password:"",
    }
    const schema = z
      .object({
        email: z.email({ message: "Invallid email address" }),
        password: z
          .string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            {
              message:
                "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
            }
          )});


export default function Login() {

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({defaultValues, resolver:zodResolver(schema)});

  const [apiError, setApiError] = useState(null);

  const {setToken} = useContext(AuthContext);

  async function onSubmit(data){
    console.log(data);
    try {
      const {data: response} = await axios.post(URL, data);

      if (response.message === 'success') {
        // go to login
        setApiError(null);
        localStorage.setItem("token", response.token);
        setToken(response.token);
        console.log("testttt");
        navigate('/');
      } else{
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error)
      setApiError(error.response.data.error)
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kudo | Login</title>
      </Helmet>

      <section className="py-12">
        <div className="container">
          <div className="max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800">
            <h1>Login</h1>
            {apiError && (
              <Alert color="failure" icon={HiInformationCircle}>
                {apiError}
              </Alert>
            )}
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/**************** Email **************/}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="karim96radwan@gmail.com"
                  {...register("email")}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              {/**************** Password **************/}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Password">Password</Label>
                </div>
                <TextInput
                  id="Password"
                  type="password"
                  placeholder="*********"
                  {...register("password")}
                />
                <p className="text-red-500">{errors.Password?.message}</p>

                {/* <TextInput
                id="Password"
                type="password"
                placeholder="*********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters;",
                  },
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                    message: "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
                  }
                })}
              /> */}
                {/* <p className="text-red-500">{errors.password?.message}</p> */}
              </div>
              {/* <Button type="submit">Register new account</Button> */}
              <AppButton disabled={!isValid} isLoading={isSubmitting}>
                Login
              </AppButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
