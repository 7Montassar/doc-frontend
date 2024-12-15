import { XMLParser } from "fast-xml-parser";

export const soapReq = async (headers = {}, soapEnvelope = '') => {
    try {
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

        const text = await response.text();

        const parser = new XMLParser({
            ignoreAttributes: false, // Preserve attributes if any
            parseTagValue: true,     // Parse tag values
        });
        const parsedResponse = parser.parse(text);

        return parsedResponse;
    } catch (error) {
        console.error("Error in SOAP request:", error);
        throw error;
    }
};
