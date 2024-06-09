"use client"

import {SigninForm} from "@/components/SigninForm";

export default function page() {
    return (
        <div className="flex flex-col place-items-center">
            <h1 className={'text-4xl py-5 pb-10'}>CollegeConnect</h1>
            <SigninForm/>
        </div>
    )
}
