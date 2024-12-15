import * as z from "zod";

export const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    role: z.enum(["employee", "manager"]),
    firstName: z.string().min(1, {
        message: "First name is required",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required",
    }),
    managerType: z.string().min(1, {
        message: "Manager type is required",
    }),
})

export const loginFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

