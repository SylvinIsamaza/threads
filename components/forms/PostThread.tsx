"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";



import { updateUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { threadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.action";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const PostThread =({ userId }:{userId:string}) => {
 
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: '',
      accountId:userId
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId:null,
      path:pathname
  })
  router.push("/");
  };


  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10 bg-dark-3 px-6 py-6 rounded-xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >






        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Thread
              </FormLabel>
              <FormControl className=" border bg-dark-1 border-dark-4 ">
                <Textarea
                  rows={13}
                  className=" !bg-dark-1 no-focus text-light-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
