"use server";
import { XMLParser } from "fast-xml-parser";
import {
    fetchAllUsersStatsEnvelope,
    fetchUserRoleDistributionEnvelope,
    getAllUsersEnvelope,
    toggleUserStatusEnvelope
} from "@/soap/envelopes";
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



export async function fetchUserRoleDistribution() {
    try {
        const token = await getSession();
        const soapEnvelope = fetchUserRoleDistributionEnvelope(token);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/soap/`, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
                "SOAPAction": "project.user",
            },
            body: soapEnvelope,
        });

        if (!response.ok) {
            console.error(`Failed with status: ${response.status}`);
            throw new Error("Failed to fetch user role distribution.");
        }

        const xml = await response.text();
        console.log("Raw XML response:", xml); // Log raw response

        const parser = new XMLParser();
        const parsed = parser.parse(xml);

        // Log parsed response to understand its structure
        console.log("Parsed response:", parsed);

        // Access the role distribution data in the correct way
        // @ts-ignore
        const roleDistribution = parsed["soap11env:Envelope"]["soap11env:Body"]
            ["tns:fetch_user_role_distributionResponse"]
            ["tns:fetch_user_role_distributionResult"];

        console.log("roleDistribution:", roleDistribution);

        // Return the extracted data
        return {
            admin: parseInt(roleDistribution.admin) || 0,
            manager: parseInt(roleDistribution.manager) || 0,
            employee: parseInt(roleDistribution.employee) || 0,
        };

    } catch (error) {
        console.error("Failed to fetch user role distribution:", error);
        return {}; // Return an empty object on error
    }
}





export async function fetchActiveUsersStats(){
    try{
        const token = await getSession();
        const soapEnvelope = fetchAllUsersStatsEnvelope(token);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/soap/`, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
                "SOAPAction": "project.user",
            },
            body: soapEnvelope,

        });

        if (!response.ok) {
            throw new Error(`SOAP request failed with status ${response.status}: ${response.statusText}`);
        }

        const responseText = await response.text();
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
            removeNSPrefix: true
        });

        const parsedXML = parser.parse(responseText);

        // Extract total and change values from the parsed XML
        const result = parsedXML.Envelope.Body.get_active_users_statsResponse.get_active_users_statsResult;

        const total = parseInt(result.total, 10) || 0;
        const change = parseFloat(result.change) || 0.0;

        return { total, change };


    } catch (e){
        console.error(e)
        return {total: 0, change:0}
    }
}



export async function fetchDashboardData() {
    try {
        const token = await getSession();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document/get_dashboard_data/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch dashboard data.");
        }

        return await response.json(); // Expected format: { total_documents, pending_documents, status_distribution }
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return {
            total_documents: { total: 0, change: 0 },
            pending_documents: { total: 0, change: 0 },
            status_distribution: [],
        };
    }
}


export async function fetchRecentActivities() {
    try {
        const token = await getSession();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document/recent_activity/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch recent activities.");
        }

        return await response.json(); // Expected format: [{ user, action, document_name, time }]
    } catch (error) {
        console.error("Error fetching recent activities:", error);
        return [];
    }
}
