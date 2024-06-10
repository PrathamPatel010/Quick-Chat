"use client";

import { z } from "zod";
import { CldUploadButton } from 'next-cloudinary';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";

const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(30),
});

export function SignupForm() {
    const cloudinaryPreset = process.env['NEXT_PUBLIC_CLOUDINARY_PRESET'];
    const API_URL = process.env['NEXT_PUBLIC_API_URL'];
    const [pic, setPic] = useState('');
    const [processing, setProcessing] = useState(false);
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            username: '',
            password: ''
        }
    });

    async function handleSubmit(values) {
        setProcessing(true);
        try {
            const userData = { ...values, pic };
            const response = await axios.post(`${API_URL}/auth/signup`, userData);
            console.log('Response:', response.data); // Debugging line
            if (response?.data?.success) {
                toast({
                    title: "User Registered Successfully!!",
                    description: "Check your email for account verification",
                });
                setProcessing(false);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error); // Debugging line
            toast({
                title: "Registration Failed",
                description: "An error occurred during registration. Please try again.",
                variant: 'destructive',
            });
            setProcessing(false);
        }
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
                            <FormControl>
                                <CldUploadButton
                                    className={'bg-gray-500 px-2 py-1 rounded-md'}
                                    uploadPreset={cloudinaryPreset}
                                    onError={(error) => console.log(error)}
                                    onSuccess={(res) => {
                                        const publicUrl = res?.info?.secure_url;
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
                {processing ? (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className={'bg-white text-black hover:bg-gray-500 hover:text-white'}>
                        Sign-up
                    </Button>
                )}
            </form>
        </Form>
    )
}
