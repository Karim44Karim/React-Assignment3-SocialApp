import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Checkbox, Label, TextInput, Radio, Alert, Datepicker, theme } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import AppButton from "../../../components/shared/AppButton/AppButton";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import {Helmet} from "react-helmet";
import { toast } from "react-toastify";


  const URL = `${import.meta.env.VITE_BASE_URL}/users/signup`
  const defaultValues = {
      name:"",
      email:"",
      password:"",
      rePassword:"",
      gender:"",
      dateOfBirth:"",
    }
    const schema = z
      .object({
        name: z
          .string({ message: "Name is required" })
          .min(2, { message: "name must be at least 2 characters long" }),
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
          ),
        rePassword: z.string(),
        gender: z.literal(["male", "female"]),
        dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}/),
        // dateOfBirth: z.string().refine((value) => {
        //   console.log(value);
        //   const selectedDate = new Date(value);
        //   const today = new Date();
        //   if(selectedDate.getFullYear() < today.getFullYear()){
        //     return false;
        //   }}
      // )
    })
      .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["repassword"],
      });

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({defaultValues, resolver:zodResolver(schema)});

  const [apiError, setApiError] = useState(null);
  async function onSubmit(data){
    console.log(data);
    try {
      const {data: response} = await axios.post(URL, data);

      if (response.message === 'success') {
        // go to login
        console.log("Register Success");
        navigate('/login');
        console.log("navigation Success");
        // localStorage.setItem("token", response.token);
        setApiError(null);
      } else{
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.error}`, { theme: "dark" });
      setApiError(error.response.data.error)
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kudo | Register</title>
      </Helmet>

      <section className="py-12">
        <div className="container">
          <div className="max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800">
            <h1>Register</h1>
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
              {/**************** Name **************/}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Name">Name</Label>
                </div>
                <TextInput
                  id="Name"
                  type="text"
                  placeholder="ex. Karim Radwan"
                  {...register("name")}
                />
                <p className="text-red-500">{errors.name?.message}</p>
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
              {/**************** Confirm Password **************/}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="rePassword">Confirm Password</Label>
                </div>
                <TextInput
                  id="rePassword"
                  type="password"
                  placeholder="*********"
                  {...register("rePassword")}
                />
                <p className="text-red-500">{errors.repassword?.message}</p>
              </div>
              {/**************** BirthDate **************/}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dateOfBirth">Birthdate</Label>
                </div>
                {/* <TextInput
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              /> */}

                <Controller
                  render={({ field }) => (
                    <Datepicker
                      {...field}
                      value={field.value ? new Date(field.value) : new Date()}
                      onChange={(date) => {
                        const formattedDate = new Date(date)
                          .toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replaceAll("/", "-");

                        return field.onChange(formattedDate);
                      }}
                    />
                  )}
                  name="dateOfBirth"
                  control={control}
                />
                <p className="text-red-500">{errors.dateOfBirth?.message}</p>
              </div>

              {/**************** Gender **************/}
              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="male" value="male" {...register("gender")} />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="female" value="female" {...register("gender")} />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
              <p className="text-red-500">{errors.gender?.message}</p>

              {/* <Button type="submit">Register new account</Button> */}
              <AppButton disabled={!isValid} isLoading={isSubmitting}>
                Register
              </AppButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
