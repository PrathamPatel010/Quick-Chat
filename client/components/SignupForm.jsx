"use client"

import { z } from "zod"
import { CldUploadButton } from 'next-cloudinary';
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

const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(30),
});

export function SignupForm() {
    const cloudinaryPreset = process.env['NEXT_PUBLIC_CLOUDINARY_PRESET'];
    const [pic, setPic] = useState('');

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            username: '',
            password: ''
        }
    });

    function handleSubmit(values) {
        const userData = {...values,pic};
        console.log("User data: ", userData);
    }

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
                                <Input {...field} type="password" placeholder="Password"/>
                                    {/*Eye Icon*/}
                                {/*</Input>*/}
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
                            <FormControl>
                                <CldUploadButton
                                    className={'bg-gray-500 px-2 py-1 rounded-md'}
                                    uploadPreset={cloudinaryPreset}
                                    onError={(error)=>console.log(error)}
                                    onSuccess={(res)=>{
                                        const publicUrl = res?.info?.secure_url
                                        setPic(publicUrl);
                                    }}
                                />
                            </FormControl>
                            <FormDescription className={'text-gray-300'}>
                                Upload profile picture. It is optional.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit"
                    className={'bg-white text-black hover:bg-gray-500 hover:text-white'}>
                    Sign-up
                </Button>
            </form>
        </Form>
    )
}
