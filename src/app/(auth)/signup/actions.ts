import { z } from "zod";
import { formSchema } from "@/lib/definitions";
import { toast } from "react-toastify";

export const handleSignup = async (values: z.infer<typeof formSchema>) => {
    try {
        const soapEnvelope = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user" xmlns:user="user.complexTypes">
                <soapenv:Header/>
                <soapenv:Body>
                    <proj:register_user>
                        <proj:complex_user>
                            <user:username>${values.username}</user:username>
                            <user:email>${values.email}</user:email>
                            <user:password>${values.password}</user:password>
                            <user:role>${values.role}</user:role>
                            <user:first_name>${values.firstName}</user:first_name>
                            <user:last_name>${values.lastName}</user:last_name>
                        </proj:complex_user>
                    </proj:register_user>
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

        // Handle success response
        const resultTag = xmlDoc.getElementsByTagName("tns:register_userResult")[0];
        const token = resultTag?.textContent;

        if (token) {
            // Successfully logged in, store token in localStorage or context
            localStorage.setItem("authToken", token);
            toast.success("Account Created successfully!");
            } else {
            throw new Error("Token not found in response.");
        }


        return responseText;
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        toast.error(errorMessage);

        console.error(e);
        throw e;
    }
};
