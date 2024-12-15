import { soapReq } from "@/soap/request";
import {getUserRoleEnvelope} from "@/soap/envelopes";
import {getSession} from "@/lib/auth";

export const getUserRole = async () => {
    try {
        const token = await getSession();
        const soapEnvelope = getUserRoleEnvelope(token)
        const headers = {
            "Authorization": `Bearer ${token}`,
        };
        const parsedResponse = await soapReq(headers, soapEnvelope);

        // Handle the parsed SOAP response
        const userRole = parsedResponse["soap11env:Envelope"]?.["soap11env:Body"]?.["tns:get_user_roleResponse"]?.["tns:get_user_roleResult"];

        if (!userRole) {
           return "none"
        }

        return userRole;
    } catch (error) {
        console.error("Failed to get user role:", error);
        return "none"
    }
};
