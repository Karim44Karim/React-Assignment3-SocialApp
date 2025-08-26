import { Avatar, Textarea, theme } from 'flowbite-react';
import React, { useContext, useState } from 'react'
import { formatDate } from '../../lib/formatDate';
import {Dropdown, DropdownItem } from "flowbite-react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import AppButton from '../shared/AppButton/AppButton';
import { useForm } from 'react-hook-form';
import UpdatePost from './UpdatePost';

export default function CommentPostHeader({
    user: {name, photo, createdAt, body, _id, image},
    isComment = true,
    mediaId,
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const {userData} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const{mutate: handleDeletePost} = useMutation({
    mutationFn: deletePost,
    onSuccess: ()=>{
      isComment ?
      toast.success("Comment Deleted Successfully!", {
        theme: "dark",
      }):  toast.success("Post Deleted Successfully!", {
        theme: "dark",
      })
      queryClient.invalidateQueries(["userPosts"]);
      queryClient.invalidateQueries(["allPosts"]);
    },
    onError: ()=>{
      toast.error("Post Deletion Failed!", {
        theme: "dark",
      },
      )
    }
  })
  async function deletePost(){
    const endPoint = isComment? "comments" : "posts";
    return await axios.delete(`${import.meta.env.VITE_BASE_URL}/${endPoint}/${mediaId}`, {
      headers: {
        token: localStorage.getItem("token"),
      }
    })
  }

  const {register, handleSubmit} = useForm();
  const { mutate: handleUpdateComment, error } = useMutation({
    mutationFn: updateComment,
    onSuccess: ()=>{
      toast.success("Comment Updated Successfully!", { theme: "dark" });
      setIsEditing(false);
      queryClient.invalidateQueries(["userPosts"]);
      queryClient.invalidateQueries(["allPosts"]);
    },
    onError: ()=>{
      console.log(error.message);
      
      toast.error("Comment Update Failed!", { theme: "dark" });
    }
  });
  async function updateComment(data){
    
    console.log(data);

    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/${isComment?"comments":"posts"}/${mediaId}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token")},
      }
    );
  }
  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex">
          <picture>
            <Avatar
              alt={name}
              img={
                photo && !photo.includes("undefined")
                  ? photo
                  : `${
                      import.meta.env.VITE_BASE_URL
                    }/uploads/default-profile.png`
              }
              rounded
              className="me-4"
            />
          </picture>
          <div>
            <h2 className="text-lg mb-0 font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h2>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center">
          {userData._id == _id ? (
            <Dropdown inline label="">
              <DropdownItem
                onClick={() => {
                  isComment ? setIsEditing(true) : setIsEditingPost(true);
                  console.log(body);
                }}
              >
                Edit
              </DropdownItem>
              <DropdownItem onClick={handleDeletePost}>Delete</DropdownItem>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
      </header>
      {isEditing ? (
        <form onSubmit={handleSubmit(handleUpdateComment)}>
          <Textarea
            className="mb-4"
            key={body}
            defaultValue={body}
            {...register("content")}
          />
          <div className="flex gap-2">
            <AppButton type="submit">Update</AppButton>
            <AppButton
              color="alternate"
              type="reset"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </AppButton>
          </div>
        </form>
      ) : (
        <h3
          className={`text-lg font-bold tracking-tight text-gray-300 dark:text-white${
            isComment ? "ps-16" : ""
          }`}
        >
          {body}
        </h3>
      )}

      <UpdatePost
        isEditingPost={isEditingPost}
        setIsEditingPost={setIsEditingPost}
        image={image}
        body={body}
        mediaId={mediaId}
      />
    </>
  );
}