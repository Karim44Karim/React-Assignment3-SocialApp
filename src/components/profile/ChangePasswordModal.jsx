import { Label, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import AppButton from '../shared/AppButton/AppButton';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function ChangePasswordModal({showChangePassModal, setShowChangePassModal}) {
      const navigate = useNavigate();
      const schema = z
      .object({
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
        newPassword: z.string().regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            {
              message:
                "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
            }
          ),
    })
      .refine((data) => data.password != data.newPassword, {
        message: "New password shall be different form the current password",
        path: ["newPassword"],
      });


      const defaultValues = {
        password: "",
        newPassword: "",
      };
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
      } = useForm({ defaultValues, resolver: zodResolver(schema) });
 

  async function onSubmit(data) {

    try {
     const { data: response } = await axios.patch(
       `${import.meta.env.VITE_BASE_URL}/users/change-password`,
       data,
       { headers: {
        token: localStorage.getItem("token"),
       } }
     );

     if(response.message === "success"){
           toast.success("Password Changed Successfully!", {
       theme: "dark",
     });
     setShowChangePassModal(false);
      localStorage.removeItem("token");
     navigate("/login");

     } else{
      throw new Error(response.error);
     }

    } catch (error) {
          toast.error("Password Change Failed!", {
       theme: "dark",
     })
      console.log(error);
    }
  }


      
  return (
    <>
      <Modal
        show={showChangePassModal}
        size="md"
        onClose={() => setShowChangePassModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Change Passowrd
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Current Password</Label>
                </div>
                <TextInput
                  id="password"
                  placeholder="Current Password"
                  type="password"
                  {...register("password")}
                  required
                />
              </div>
                <p className="text-red-500">{errors.password?.message}</p>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newPassword">New Password</Label>
                </div>
                <TextInput
                  id="newPassword"
                  placeholder="New Password"
                  type="password"
                  {...register("newPassword")}
                  required
                />
              </div>
                <p className="text-red-500">{errors.newPassword?.message}</p>

              <div className="w-full">
                <AppButton className="mx-auto" disabled={!isValid} isLoading={isSubmitting}>Change Password</AppButton>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
