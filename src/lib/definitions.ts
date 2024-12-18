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
    managerType: z.string().optional(),  // Initially make it optional
}).refine((data) => {
    // Only validate `managerType` when the role is 'manager'
    if (data.role === "manager") {
        // @ts-ignore
        return data.managerType?.length > 0; // managerType must be non-empty for managers
    }
    return true; // no validation for managerType if role is 'employee'
}, {
    message: "Manager type is required when role is manager",
    path: ["managerType"],
});


export const loginFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

