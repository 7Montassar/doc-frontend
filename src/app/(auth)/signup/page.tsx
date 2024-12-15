<<<<<<< HEAD
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, UserCircle, Briefcase, FileText, Mail, Lock, User } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { formSchema } from "@/lib/definitions"
import { Button } from "@/app/(employee)/_components/ui/button"
=======
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, UserCircle, Briefcase, FileText, Mail, Lock, User } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
>>>>>>> 8fcdc8c87df62b887c18660f397d03ba3ef8161a
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
<<<<<<< HEAD
} from "@/app/(employee)/_components/ui/form"
import { Input } from "@/app/(employee)/_components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/app/(employee)/_components/ui/radio-group"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthBackground from "@/app/(auth)/_components/AuthBackground"
import { handleSignup } from "@/app/(auth)/signup/actions"
import Link from "next/link"
=======
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthBackground from "@/app/(auth)/_components/AuthBackground";
import { handleSignup } from "@/app/(auth)/signup/actions";
import Link from "next/link";
>>>>>>> 8fcdc8c87df62b887c18660f397d03ba3ef8161a

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("employee");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            role: "employee",
            firstName: "",
            lastName: "",
            managerType: "",
        },
    });

    // Handle role change
    const handleRoleChange = (value: string) => {
        setRole(value);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await handleSignup(values);
            toast.success("Account Created successfully!");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-sky-100 to-cyan-100 relative overflow-hidden">
            <AuthBackground />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md z-10"
            >
                <ToastContainer />
                <div className="flex items-center justify-center mb-6">
                    <FileText className="text-[#0e708b] w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-[#0e708b]">Create an Account</h2>
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
                                        <Input placeholder="johndoe" {...field} className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center text-gray-700">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john@example.com" {...field} className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]" />
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
                                        <Input type="password" placeholder="********" {...field} className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="flex items-center text-gray-700">
                                            <User className="w-4 h-4 mr-2" />
                                            First Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="flex items-center text-gray-700">
                                            <User className="w-4 h-4 mr-2" />
                                            Last Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-gray-700">Account Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handleRoleChange(value);
                                            }}
                                            defaultValue={field.value}
                                            className="flex space-x-4"
                                        >
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="employee" id="employee" className="text-[#0e708b]" />
                                                </FormControl>
                                                <FormLabel htmlFor="employee" className="font-normal flex items-center cursor-pointer">
                                                    <UserCircle className="w-5 h-5 mr-2 text-[#0e708b]" />
                                                    Employee
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="manager" id="manager" className="text-[#0e708b]" />
                                                </FormControl>
                                                <FormLabel htmlFor="manager" className="font-normal flex items-center cursor-pointer">
                                                    <Briefcase className="w-5 h-5 mr-2 text-[#0e708b]" />
                                                    Manager
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {role === "manager" && (
                            <FormField
                                control={form.control}
                                name="managerType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center text-gray-700">
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            Manager Type
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="HR, Finance, etc." {...field} className="bg-gray-50 border-gray-300 focus:border-[#0e708b] focus:ring-[#0e708b]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
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
                                "Sign Up"
                            )}
                        </Button>
                        <div className="text-center mt-4">
                            <Link href="/signin" className="text-sm text-[#0e708b] hover:underline">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </motion.div>
        </div>
    );
};

export default Signup;
