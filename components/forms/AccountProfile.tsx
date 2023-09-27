"use client";
import React, { ChangeEvent } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validation/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
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
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profilePhoto: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof userValidation>) {
    console.log(values);
  }

  const handleImage = (e: ChangeEvent, fieldChange: (val: string) => void) => {
    e.preventDefault();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
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
            <FormItem className="flex items-center gap-4">
              <FormLabel className=" text-base-semibold text-light-2">
            Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  
                  placeholder="Upload  a photo"
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
            <FormItem className="flex items-center gap-4">
              <FormLabel className=" text-base-semibold text-light-2">
            Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  
                  placeholder="Upload  a photo"
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
            <FormItem className="flex items-center gap-4">
              <FormLabel className=" text-base-semibold text-light-2">
            Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea>
                  
 </Textarea>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
