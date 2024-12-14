import { z } from "zod";
import { toast } from "react-toastify";

export const loginFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    try {
        const soapEnvelope = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user">
                <soapenv:Header/>
                <soapenv:Body>
                    <proj:login_user>
                        <proj:username>${values.username}</proj:username>
                        <proj:password>${values.password}</proj:password>
                    </proj:login_user>
                </soapenv:Body>
            </soapenv:Envelope>
        `;

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/soap/`, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
                "SOAPAction": "project.user",
            },
            body: soapEnvelope,
        });

        const responseText = await resp.text();

        // Parse XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, "text/xml");

        if (!resp.ok) {
            // Handle SOAP Fault if status is not OK
            const faultString = xmlDoc.getElementsByTagName("faultstring")[0]?.textContent;
            throw new Error(faultString || "An unknown error occurred.");
        }

        // Extract token from the SOAP response
        const resultTag = xmlDoc.getElementsByTagName("tns:login_userResult")[0];
        const token = resultTag?.textContent;

        if (token) {
            // Successfully logged in, store token in localStorage or context
            localStorage.setItem("authToken", token);
            toast.success("Logged in successfully!");
        } else {
            throw new Error("Token not found in response.");
        }

        return token;
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        toast.error(errorMessage);

        console.error(e);
        throw e;
    }
};
