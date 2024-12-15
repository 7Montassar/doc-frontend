"use server";
import { z } from "zod";
import { XMLParser } from "fast-xml-parser";
import {loginFormSchema} from "@/lib/definitions";
import {setSession} from "@/lib/auth.js";


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
        const parser = new XMLParser({ ignoreAttributes: false });
        const parsedXML = parser.parse(responseText);

        if (!resp.ok) {
            const faultString = parsedXML["soap11env:Envelope"]?.["soap11env:Body"]?.["soap11env:Fault"]?.["faultstring"] || "An unknown error occurred.";
            throw new Error(faultString);
        }

        const token = parsedXML["soap11env:Envelope"]?.["soap11env:Body"]?.["tns:login_userResponse"]?.["tns:login_userResult"];
        if (!token) throw new Error("Token not found in response.");
        await setSession(token);

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        throw new Error(errorMessage);
    }
};
