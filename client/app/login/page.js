"use client"

import {SignupForm} from "@/components/SignupForm";

export default function page() {
    return (
        <main className="flex flex-col items-center min-h-screen">
            <h1 className={'text-4xl'}>CollegeConnect</h1>
            <SignupForm/>
        </main>
    )
}
