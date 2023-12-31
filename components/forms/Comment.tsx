"use client"
import React from 'react'
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { commentValidation } from '@/lib/validation/thread';
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.action';
import { useParams, usePathname, useRouter } from 'next/navigation';


interface props{
  threadId: string;
  currentUserId: string;
  currentUserImg:string
}


function Comment({ threadId, currentUserImg, currentUserId }: props) {
  const path = usePathname()
  const router=useRouter()
  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: '',
      accountId:currentUserId
    },
  });
  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
console.log('submitting the form')
    await addCommentToThread(threadId, values.thread, currentUserId, path)
    router.push("/");
   
  };
  return (
    <Form {...form}>
    <form
      className="comment-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >






      <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className="flex w-full f gap-3">
            <FormLabel className='account-form_image-label !relative'>
             <Image src={currentUserImg}  alt="profile photo" fill  className='rounded-full object-cover '/>
            </FormLabel>
            <FormControl className=" bg-transparent border-none ">
              <Input
                placeholder='Comment...'
                className=" no-focus text-light-1 outline-none"
                {...field}
              />
            </FormControl>
         
          </FormItem>
        )}
      />

      <Button type="submit" className="comment-form_btn">
        Reply
      </Button>
    </form>
  </Form>
  )
}

export default Comment