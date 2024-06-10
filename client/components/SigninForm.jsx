"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
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
    email: z.string().email(),
    password: z.string().min(8).max(30),
});

export function SigninForm() {
    const API_URL = process.env['NEXT_PUBLIC_API_URL'];
    const [processing, setProcessing] = useState(false);
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function handleSubmit(userData) {
        setProcessing(true);
        try {
            const response = await axios.post(`${API_URL}/auth/login`, userData);
            console.log('Response:', response.data); // Debugging line
            if (response?.data?.success) {
                toast({
                    title: "User Logged-in Successfully!!",
                    description: "Wait while you are redirected",
                });
                setProcessing(false);
                localStorage.setItem("token", JSON.stringify(response.data?.data.token));
                window.location.href = "http://localhost:3000/chats";
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            toast({
                title: "Sign-in Failed",
                description: "An error occurred during login. Please try again.",
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
                                Enter your college mail you used while signup
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
                            </FormControl>
                            <FormDescription className={'text-gray-500'}>
                                The password for this email
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit"
                    className={'bg-white text-black hover:bg-gray-500 hover:text-white'}>
                    Sign-in
                </Button>
            </form>
        </Form>
    )
}
