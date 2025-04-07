import axios from "axios";

// exchange code for access token
export const  exchangeCodeForAccessToken = async (authorizationCode,keycloakConfig) => {
    // retrieve keycloak jwt
    try{
    const response = await axios.post(keycloakConfig.tokenEndpoint, new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        redirect_uri: keycloakConfig.redirectUri,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if(!response){
        return undefined;
    }

    
    const { access_token, refresh_token } = response.data;

    return {access_token,refresh_token}
    
    }
    catch(error){
        throw error;
    }
    
    
};