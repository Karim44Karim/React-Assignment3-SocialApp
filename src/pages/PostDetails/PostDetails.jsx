import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PostItem from '../../components/posts/PostItem';
import { useQuery } from '@tanstack/react-query';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';

export default function PostDetails () {
    const {id} = useParams();
    const { userData } = useContext(AuthContext);

    const {data, isLoading, isError, error} = useFetch(["postDetails", id], `posts/${id}`, userData);
    // const {data, isLoading, isPending, isFetching, isError, error } = useQuery({
    //   queryKey: ["postDetails", id],
    //   queryFn: getPost,
    // })

    // async function getPost() {
    //   return axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
    //       headers: {
    //         token: localStorage.getItem("token"),
    //       },
    //     })
    // }
    ////////////////////////////////////////////////
    // const [post, setPost] = useState(null);

    // async function getPost() {
    // try {
    //     const {
    //       data: {post}
    //     } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
    //       headers: {
    //         token: localStorage.getItem("token"),
    //       },
    //     });
    //     console.log(post);
    //     setPost(post);

    // } catch (error) {
    //   console.log(error);
    // }
    // }

    // useEffect(() => {
    //   getPost();
    // }, [])
    
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          {isLoading && <div className="text-center text-4xl">Loading...</div>}
          {data && <PostItem post={data.post} showAllComments={true} />}
        </div>
      </div>
    </section>
  );
}
