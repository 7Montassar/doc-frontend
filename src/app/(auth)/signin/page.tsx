"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, FileText, UserCircle, Lock } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema} from "@/lib/definitions"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { handleLogin } from "@/app/(auth)/signin/actions"
import Link from "next/link"
import AuthBackgroundDarkTheme from "@/app/(auth)/_components/AuthBackgroundDarkTheme";
import AuthBackground from "@/app/(auth)/_components/AuthBackground"
import {redirect} from "next/navigation";


const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoading(true);

        try {
            await handleLogin(values);
            toast.success("Logged in successfully!");
            setTimeout(() => {
                redirect("/dashboard")
            }, 2000);

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-sky-100 to-cyan-100 relative overflow-hidden">
            <AuthBackgroundDarkTheme/>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md z-10"
            >
                <ToastContainer/>
                <div className="flex items-center justify-center mb-6">


                <FileText className="text-[#0e708b] w-12 h-12" />
        </div>
    <h2 className="text-3xl font-bold mb-6 text-center text-[#0e708b]">Login to Your Account</h2>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center text-gray-700">
                                        <UserCircle className="w-4 h-4 mr-2" />
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe"
                                            {...field}
                                            className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center text-gray-700">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                            className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-[#0e708b] hover:bg-[#0c5f75] transition-colors duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Log In"
                            )}
                        </Button>
                        <div className="text-center mt-4">
                            <Link href="/signup" className="text-sm text-[#0e708b] hover:underline">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </motion.div>
        </div>
    )
}

export default Login

