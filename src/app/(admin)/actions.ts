"use server";
import { XMLParser } from "fast-xml-parser";
import { getAllUserRoleEnvelope } from "@/soap/envelopes";
import { getSession } from "@/lib/auth";
import {User} from "@/types/user";

export const getAllUsers = async () => {
    try {
        const token = await getSession();
        const soapEnvelope = getAllUserRoleEnvelope();
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/soap/`, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
                "SOAPAction": "project.user",
                ...headers,
            },
            body: soapEnvelope,
        });

        const responseText = await response.text();
        console.log("responseText", responseText);

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
            removeNSPrefix: true, // Remove namespace prefixes for easier access
        });
        const parsedXML = parser.parse(responseText);

        if (!response.ok) {
            throw new Error(`SOAP request failed with status ${response.status}: ${response.statusText}`);
        }

        console.log("parsedXML", parsedXML);

        const users: User[] = [];
        const userNodes =
            parsedXML?.Envelope?.Body?.get_all_usersResponse?.get_all_usersResult?.User || [];

            for (const userNode of Array.isArray(userNodes) ? userNodes : [userNodes]) {
                const id = userNode.id || "";
                const username = userNode.username || "";
                const email = userNode.email || "";
                const role = userNode.role || "employee";
                const first_name = userNode.first_name || "";
                const last_name = userNode.last_name || "";
                const manager_type = userNode.manager_type || undefined;
                const is_active = userNode.is_active === true || userNode.is_active === "true";

                users.push({
                    id: parseInt(id, 10),
                    username,
                    email,
                    role: role as "admin" | "manager" | "employee",
                    first_name,
                    last_name,
                    manager_type,
                    is_active,
                });
            }

        console.log("users", users);

        return users;
    } catch (error) {
        console.error("Failed to get all users:", error);
        return [];
    }
};
