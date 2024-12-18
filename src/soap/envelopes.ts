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


export const getAllUsersEnvelope = (token: String) => {
    return `
     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user" xmlns:proj1="project.user.headers">
   <soapenv:Header/>
   <soapenv:Body>
      <proj:get_all_users>
         <proj:headers>
            <proj1:authorization>${token}</proj1:authorization>
         </proj:headers>
      </proj:get_all_users>
   </soapenv:Body>
</soapenv:Envelope>
    `;
};

export const toggleUserStatusEnvelope = (userId: number, token: String) => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user" xmlns:proj1="project.user.headers">
   <soapenv:Header/>
   <soapenv:Body>
      <proj:toggle_account_status>
         <proj:headers>
            <proj1:authorization>${token}</proj1:authorization>
         </proj:headers>
         <proj:userId>${userId}</proj:userId>
      </proj:toggle_account_status>
   </soapenv:Body>
</soapenv:Envelope>
    `;
};

export const fetchAllUsersStatsEnvelope = (token: String) => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user" xmlns:proj1="project.user.headers">
   <soapenv:Header/>
   <soapenv:Body>
      <proj:get_active_users_stats>
         <proj:headers>
            <proj1:authorization>${token}</proj1:authorization>
         </proj:headers>
      </proj:get_active_users_stats>
   </soapenv:Body>
</soapenv:Envelope>`;
};

export const fetchUserRoleDistributionEnvelope = (token: String) => {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="project.user" xmlns:proj1="project.user.headers">
   <soapenv:Header/>
   <soapenv:Body>
      <proj:fetch_user_role_distribution>
         <!--Optional:-->
         <proj:headers>
            <!--Optional:-->
            <proj1:authorization>${token}</proj1:authorization>
         </proj:headers>
      </proj:fetch_user_role_distribution>
   </soapenv:Body>
</soapenv:Envelope>`
}