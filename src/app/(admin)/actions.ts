"use server";
import { XMLParser } from "fast-xml-parser";
import {getAllUsersEnvelope, toggleUserStatusEnvelope} from "@/soap/envelopes";
import { getSession } from "@/lib/auth";
import {User} from "@/types/user";
import {revalidatePath} from "next/cache";
import { revalidateTag} from "next/cache";

export const getAllUsers = async () => {
    try {
        const token = await getSession();
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const soapEnvelope = getAllUsersEnvelope(token);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/soap/`, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
                "SOAPAction": "project.user",
                ...headers,
            },
            body: soapEnvelope,

        });

        if (!response.ok) {
            throw new Error(`SOAP request failed with status ${response.status}: ${response.statusText}`);
        }

        const responseText = await response.text();
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_", removeNSPrefix: true });
        const parsedXML = parser.parse(responseText);

        const users: User[] = [];
        const userNodes = parsedXML?.Envelope?.Body?.get_all_usersResponse?.get_all_usersResult?.User || [];
        for (const userNode of Array.isArray(userNodes) ? userNodes : [userNodes]) {
            users.push({
                id: parseInt(userNode.id, 10),
                username: userNode.username,
                email: userNode.email,
                role: userNode.role as "admin" | "manager" | "employee",
                first_name: userNode.first_name,
                last_name: userNode.last_name,
                manager_type: userNode.manager_type || undefined,
                is_active: userNode.is_active === true || userNode.is_active === "true",
            });
        }

        return users;
    } catch (error) {
        console.error("Failed to get all users:", error);
        return [];
    }
};

export const toggleUserStatus = async (userId: number): Promise<string> => {
    try {
        const token = await getSession();
        const soapEnvelope = toggleUserStatusEnvelope(userId, token);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/soap/`, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
            },
            body: soapEnvelope,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const xml = await response.text();
        const parser = new XMLParser();
        const parsed = parser.parse(xml);

        // Parse the relevant SOAP response
        const result =
            parsed["soap11env:Envelope"]?.["soap11env:Body"]?.["tns:toggle_account_statusResponse"]
                ?.["tns:toggle_account_statusResult"];
        revalidateTag('users')
        return result || "Operation succeeded.";
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        throw new Error(errorMessage);
    }
};

