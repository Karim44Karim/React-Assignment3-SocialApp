import { useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import { Button, Textarea, theme } from 'flowbite-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { id } from 'zod/locales';
import AppButton from '../shared/AppButton/AppButton';
import { toast } from 'react-toastify';

export default function AddComment({post}) {
    const{register, handleSubmit, reset, formState: {isValid}} = useForm();
    // const {invalidateQueries} = useQueryClient();
    const queryClient = useQueryClient();
    const { data, mutate, isPending } = useMutation({
      mutationFn: addComment,
      onSuccess: (data)=>{
        reset();
        toast.success("Comment Created Successfully!", {
            theme: "dark",
        });
        queryClient.invalidateQueries("details-posts", post);
      },
      onError: (error)=>{
        toast.error("Comment Creation Failed!", {
            theme: "dark",
        });
      }
    });
    async function addComment(data) {
        console.log(data);
        const commentData = {...data, post};
        return axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, commentData,{
            headers: {
                token: localStorage.getItem("token"),
            }
        })
        
    }
  return (
    <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
          <Textarea
            {...register("content", {required: true})}
            id="comment"
            placeholder="Leave a comment..."
            rows={2}
          />
      <AppButton isLoading={isPending} disabled={!isValid || isPending} type="submit">Create Comment</AppButton>
    </form>
  );
}
