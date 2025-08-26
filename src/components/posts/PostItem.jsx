import React from 'react'
import { Avatar, Card } from "flowbite-react";
import { AiFillLike } from 'react-icons/ai';
import { FaComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommentPostHeader from './CommentPostHeader';
import { id } from 'zod/locales';
import AddComment from './AddComment';

export default function PostItem({post, showAllComments = false}) {
    const {
      body,
      image,
      createdAt,
      // user: { _id, name, photo },
      user,
      comments,
      _id,
    } = post;

    console.log(comments[0])
  return (
    <Card>
      {/* header */}
      <CommentPostHeader
        user={{ ...user, createdAt, body, image }}
        mediaId={_id}
        isComment={false}
      />
      {/* <header className="flex items-center">
        <picture>
          <Avatar alt={name} img={photo} rounded className="me-4" />
        </picture>
        <div>
          <h2 className="text-lg mb-0 font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h2>
          <span>{createdAt}</span>
        </div>
      </header> */}
      {/* content */}

      {/* <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {body}
      </h3> */}
      {image && <img src={image} alt={body} className="h-96 object-contain" />}

      {/* footer */}
      <footer className="flex justify-between items-center">
        <AiFillLike />

        <div className="flex gap-4">
          <FaComment />
          {comments && comments.length}
        </div>

        <Link to={`/posts/${_id}`}>
          <FaShare />
        </Link>
      </footer>
      {/* comments */}
      {comments &&
        comments.length > 0 &&
        (showAllComments ? (
          comments.map((comment) => (
            <CommentPostHeader
              user={{
                ...comment.commentCreator,
                createdAt: comment.createdAt,
                body: comment.content,
                photo: comment.commentCreator.photo,
              }}
              mediaId={comment._id}
              isComment={true}
            />
          ))
        ) : (
          <CommentPostHeader
            user={{
              ...comments[comments.length - 1].commentCreator,
              createdAt: comments[comments.length - 1].createdAt,
              body: comments[comments.length - 1].content,
              photo: comments[comments.length-1].commentCreator.photo,
            }}
            mediaId={comments[comments.length-1]._id}
            isComment={true}
          />
        ))}
      <AddComment post={_id} />
    </Card>
  );
}
