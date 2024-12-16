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


export const getAllUserRoleEnvelope = () => {
    return `
       <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user">
               <soapenv:Header/>
              <soapenv:Body>
                 <proj:get_all_users/>
              </soapenv:Body>
     </soapenv:Envelope>
    `;
};

export const toggleUserStatusEnvelope = (userId: number) => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user">
           <soapenv:Header/>
           <soapenv:Body>
              <proj:toggle_user_status>
                 <proj:userId>${userId}</proj:userId>
              </proj:toggle_user_status>
           </soapenv:Body>
        </soapenv:Envelope>
    `;
};
