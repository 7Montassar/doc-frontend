export const getUserRoleEnvelope = (token: String) => {
    return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user">
            <soapenv:Header/>
            <soapenv:Body>
                <proj:get_user_role>
                    <proj:token>${token}</proj:token>
                </proj:get_user_role>
            </soapenv:Body>
        </soapenv:Envelope>`;
};
