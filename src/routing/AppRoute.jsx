import { createBrowserRouter } from "react-router-dom";
import Layout from '../components/Layout/Layout'
// import Login from "../pages/auth/Login/Login";
// import Posts from "../pages/Posts/Posts";
// import Register from "../pages/auth/Register/Register";
// import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
// import PostDetails from "../pages/PostDetails/PostDetails";
// import Profile from "../pages/auth/Profile/Profile";
import { lazy, Suspense } from "react";

const Posts = lazy(()=> import("../pages/Posts/Posts"));
const Profile = lazy(()=> import("../pages/auth/Profile/Profile"));
const PostDetails = lazy(()=> import("../pages/PostDetails/PostDetails"));
const Login = lazy(()=> import("../pages/auth/Login/Login"));
const Register = lazy(()=> import("../pages/auth/Register/Register"));
const NotFound = lazy(()=> import("../pages/NotFound/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="h-100 flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <Posts />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoute>
            <Suspense
              fallback={
                <div className="h-100 flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <Login />
            </Suspense>
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoute>
            <Suspense
              fallback={
                <div className="h-100 flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <Register />
            </Suspense>
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="h-100 flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <PostDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <div className="h-100 flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "*",
        element: (
          <Suspense
            fallback={
              <div className="h-100 flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
          >
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);