import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, Label, Textarea } from "flowbite-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton/AppButton";

export default function Add() {
  const fileInputRef = useRef();
  const queryClient = useQueryClient();


  const {data, mutate, isPending} = useMutation({
    mutationFn: addPost,
    onSuccess: ()=>{
        reset();
        toast("Post Created Successfully!", {
          type: "success",
          theme: "dark",
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          hideProgressBar: true,
          closeOnClick: true,
        });
    queryClient.invalidateQueries(["userPosts"])
    queryClient.invalidateQueries(["allPosts"])
    },
    onError: (error)=>{
      console.log(error);
      toast("Post Creation Failed!", {
        type: "error",
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  
  async function addPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }


    return axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          }
        }
      )
    };
    //////////////////////////////////
    // try {
    //   const { data } = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}/posts`,
    //     formData,
    //     {
    //       headers: {
    //         token: localStorage.getItem("token"),
    //       }
    //     }
    //   );
    //   console.log(data);
    //   if (data.message === "sucess") {
    //     reset();
    //     toast("Post Created Successfully!", {
    //       type: "success",
    //       theme: "dark",
    //       position: "top-center",
    //       autoClose: 2000,
    //       pauseOnHover: true,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //     });
    //   } else if(data.error) {
    //     throw new Error("Something went wrong");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast("Post Creation Failed!", {
    //     type: "error",
    //     theme: "dark",
    //     position: "top-center",
    //     autoClose: 2000,
    //     pauseOnHover: true,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //   });
    // }
    

  return (
    <section className="py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          <Card>
            <form
              onSubmit={handleSubmit(mutate)}
              className="flex flex-col gap-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="comment">Post something</Label>
                </div>
                <div className="flex items-center gap-6">
                  <Textarea
                    {...register("body")}
                    id="comment"
                    placeholder="Leave a comment..."
                    rows={2}
                  />
                  <input
                    {...register("image")}
                    className="hidden"
                    ref={fileInputRef}
                    type="file"
                  />
                  <RiImageAddLine
                    onClick={() => fileInputRef.current.click()}
                    className="text-4xl cursor-pointer"
                  />
                </div>
              </div>
              {/* <Button type="submit">Submit</Button> */}
              <AppButton isLoading={isPending} disabled={!isValid || isPending} type="submit">Create Post</AppButton>

            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
