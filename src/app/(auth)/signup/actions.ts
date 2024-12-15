"use server"
import { z } from "zod";
import { formSchema } from "@/lib/definitions";
import {XMLParser} from "fast-xml-parser";
import {setSession} from "@/lib/auth.js";

export const handleSignup = async (values: z.infer<typeof formSchema>) => {
    try {
        const isManager = values.role === "manager";
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
                            ${
            isManager
                ? `<user:manager_type>${values.managerType?.toLowerCase() || ""}</user:manager_type>`
                : ""
        }
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

        const parser = new XMLParser({ ignoreAttributes: false });
        const parsedXML = parser.parse(responseText);

        if (!resp.ok) {
            const faultString = parsedXML["soap11env:Envelope"]?.["soap11env:Body"]?.["soap11env:Fault"]?.["faultstring"] || "An unknown error occurred.";
            throw new Error(faultString);
        }

        // Handle success response
        const token = parsedXML["soap11env:Envelope"]?.["soap11env:Body"]?.["tns:register_userResponse"]?.["tns:register_userResult"];
        if (!token) throw new Error("Token not found in response.");


        await setSession(token);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        throw new Error(errorMessage);
    }
};
