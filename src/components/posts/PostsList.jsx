import React, { useContext, useEffect, useState } from 'react'
import PostItem from './PostItem'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import {useQuery} from '@tanstack/react-query'
import useFetch from '../../hooks/useFetch';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PostsList({isHome = true}) {

  const { userData } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [page, setPage] = useState(1);

  const queryKey = isHome ? ["allPosts"] : ["userPosts"];
  const apiUrl = isHome
        ? `posts?sort=-createdAt`
        : `users/${userData?._id}//posts?sort=-createdAt`;

  // const { data, isLoading, isError, error } = useFetch(queryKey, apiUrl, userData);


  const { data, isLoading, isError, error } = useQuery({
    keepPreviousData: true,
    queryKey: queryKey,
    queryFn: getPosts,
    onSuccess: (data) => {
      setNextPage(
        data.data.paginationInfo.currentPage < data.data.paginationInfo.nextPage
      );
    },
    staleTime: 1000*6,
    gcTime: 3000,
    refetchOnWindowFocus: true, //true by default
    refetchOnReconnect: true, // true by default
    refetchIntervalInBackground: true, //true by default
    refetchInterval: 200000,
    retry: 3,
    retryDelay: 9000,
    enabled: !!userData,
    
  })

  // async function fetchPosts() {
  //   try {
  //     const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?sort=-createdAt&page=${page}`, {
  //       headers:{
  //         token: localStorage.getItem("token"),
  //       }
  //     });
  //     console.log(data);
  //     setPosts(data.posts);
  //     setNextPage(
  //       data.paginationInfo.currentPage < data.paginationInfo.nextPage
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchPosts();
  // }, [page])
  

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const bottom = innerHeight + document.documentElement.scrollTop >= document.body.offsetHeight;
  //     if (bottom && nextPage) {
  //       setPage(page + 1);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return ()=>{
  //     window.removeEventListener("scroll", handleScroll);
  //   }
  // }, [isScrolled, nextPage]);
  

  /////////////////////////////////////////
  // useQuery({
  //   queryKey: isHome ? ["allPosts"] : ["userPosts"],
  //   queryFn: getPosts,
  //   staleTime: 1000*6,
  //   gcTime: 3000,
  //   refetchOnWindowFocus: true, //true by default
  //   refetchOnReconnect: true, // true by default
  //   refetchIntervalInBackground: true, //true by default
  //   // refetchInterval: 200000,
  //   retry: 3,
  //   retryDelay: 9000,
  //   enabled: !!userData,
  //   select: (data) => data.data.posts,
  // });
  
////////////////////////////////////////
  async function getPosts() {
    return axios.get(isHome
        ? `${import.meta.env.VITE_BASE_URL}/posts?limit=10&sort=-createdAt`
        : `${import.meta.env.VITE_BASE_URL}/users/${userData?._id}/posts?limit=10`,{
              headers: {
                token: localStorage.getItem("token"),
              }}
    )
  }

  ////////////////////////////////////////

  // const [posts, setPosts] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const { userData } = useContext(AuthContext);

    // async function getPosts() {
    //   setIsLoading(true);
    //     try {
    //         const {
    //           data: { posts },
    //         } = await axios.get(isHome
    //     ? `${import.meta.env.VITE_BASE_URL}/posts?limit=10&sort=-createdAt`
    //     : `${import.meta.env.VITE_BASE_URL}/users/${userData?._id}/posts?limit=10`, {
    //           headers: {
    //             token: localStorage.getItem("token"),
    //           },
    //         });
    //         setPosts(posts);
    //         setError(null);
    //     } catch (error) {
    //         console.log(error);
    //         setError(error.response.data.error);
    //         setPosts(null);
    //     } finally{
    //       setIsLoading(false);
    //     }
    // }

    useEffect(() => {
      userData && getPosts();
    }, [userData])
    
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* {isLoading && <div className='text-center text-4xl'>Loading...</div>} */}
          {isLoading && (
            <Skeleton
              className="h-96 mb-4"
              baseColor="#1F2837"
              highlightColor="#111827"
              count={5}
            />
          )}
          {isError && (
            <div className="text-center text-4xl text-red-400">{error.message}</div>
          )}
          {data &&
            data.data?.posts?.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    </section>
    // <section className="py-12">
    //   <div className="max-w-3xl mx-auto">
    //     <div className="flex flex-col gap-4">
    //       {/* {isLoading && <div className='text-center text-4xl'>Loading...</div>} */}
    //       {isLoading && (
    //         <Skeleton
    //           className="h-96 mb-4"
    //           baseColor="#1F2837"
    //           highlightColor="#111827"
    //           count={5}
    //         />
    //       )}
    //       {isError && (
    //         <div className="text-center text-4xl text-red-400">
    //           {error.message}
    //         </div>
    //       )}
    //       {data &&
    //         data?.data?.posts?.map((post) => <PostItem key={post._id} post={post} />)}
    //     </div>
    //   </div>
    // </section>
  );
}
