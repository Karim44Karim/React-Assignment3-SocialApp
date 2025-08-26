import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, Textarea, TextInput } from "flowbite-react";
import { FiEdit } from 'react-icons/fi';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {Card} from "flowbite-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton/AppButton";

export default function UpdatePost({isEditingPost, setIsEditingPost, image, body, mediaId }) {
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState(image);

  useEffect(() => {
    if (isEditingPost) {
      setPreview(image);
    }
  }, [isEditingPost, image]);

  const { data, mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      reset();
      toast("Post Updated Successfully!", {
        type: "success",
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        hideProgressBar: true,
        closeOnClick: true,
      });
      queryClient.invalidateQueries(["userPosts"]);
      queryClient.invalidateQueries(["allPosts"]);
    },
    onError: (error) => {
      console.log(error);
      toast("Post Update Failed!", {
        type: "error",
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        hideProgressBar: true,
        closeOnClick: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  async function updatePost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    return axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${mediaId}`, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  return (
    <>
      <Modal
        show={isEditingPost}
        size="md"
        onClose={() => {
          setIsEditingPost(false);
          console.log(body);
          console.log(image);
        }}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment">Update Post</Label>
              </div>
              <div className="flex items-center gap-6 flex-col">
                <Textarea
                  {...register("body")}
                  id="body"
                  key={body}
                  defaultValue={body}
                  rows={2}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Post preview"
                    className="w-80 h-80 object-cover rounded-lg"
                  />
                )}
                <input
                  {...register("image")}
                  className="hidden"
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <RiImageAddLine
                  onClick={() => fileInputRef.current.click()}
                  className="text-4xl cursor-pointer"
                />
              </div>
            </div>
            <AppButton
              isLoading={isPending}
              disabled={!isValid || isPending}
              type="submit"
            >
              Update Post
            </AppButton>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
