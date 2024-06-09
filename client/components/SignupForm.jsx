"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(30),
    email: z.string().email(),
});

export function SignupForm() {
    const [pic, setPic] = useState('');
    const [picLoading, setPicLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            username: '',
            password: ''
        }
    });

    function handleSubmit(values) {
        console.log("Values are: ", values);
    }


    const postDetails = async(pics) => {
        if (pics?.type !== "image/jpeg" && pics?.type !== "image/png") {
            setPicLoading(false);
            return;
        }
        setPicLoading(true);
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "piyushproj");
        const res = await axios.post("https://api.cloudinary.com/v1_1/piyushproj/image/upload",data);
        console.log(res.data.url.toString());
        setPic(res.data.url.toString());
        setPicLoading(false);
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Email" />
                            </FormControl>
                            <FormDescription className={'text-gray-500'}>
                                Use your MBIT college-mail ID only
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Username</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Username" />
                            </FormControl>
                            <FormDescription className={'text-gray-500'}>
                                Refrain from using your real name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" placeholder="Password" />
                            </FormControl>
                            <FormDescription className={'text-gray-500'}>
                                Password must be 8-30 characters long
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose Profile Picture</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    p={1.5}
                                    accept="image/*"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </FormControl>
                            <FormDescription className={'text-gray-500'}>
                                This is optional
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button isLoading={picLoading} type="submit" className={'bg-white text-black hover:bg-gray-500 hover:text-white'}>Submit</Button>
            </form>
        </Form>
    )
}
