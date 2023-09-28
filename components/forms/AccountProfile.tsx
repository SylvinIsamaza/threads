"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,

} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validation/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/assets/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
interface props {
  user: {
    id: string;
    name: string;
    image: string;
    objectId: string;
    bio: string;
    username: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: props) => {
  const router = useRouter()
  const pathname=usePathname()
  const {startUpload}=useUploadThing("media")
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo:user?.image ||"",
      name:user?.name|| "",
      username: user?.username||"",
      bio: user?.bio||"",
    },
  });

  const  onSubmit=async (values: z.infer<typeof userValidation>)=> {
    const blob = values.profile_photo
    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged){
      const imageRes = await startUpload(files)
      if (imageRes && imageRes[0].url) {
        values.profile_photo=imageRes[0].url 
      }

    }
    await updateUser({
      userId: user.id
      , username: values.username, image: values.profile_photo, path:pathname, name: values.name, bio: values.bio
    })
    if (pathname === "profile/edit") {
      router.back()
    }
    else {
      router.push('/')
    }
  }
  const [files,setFiles]=useState<File[]>([])

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (val: string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files))
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl  = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }

  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    priority
                    className=" object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload  a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className=" items-center gap-4">
              <FormLabel className=" text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  placeholder="name"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className=" items-center gap-4">
              <FormLabel className=" text-base-semibold text-light-2 block">
                Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  placeholder="Username"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea rows={10} className="account-form_input no-focus"/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 w-full">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
