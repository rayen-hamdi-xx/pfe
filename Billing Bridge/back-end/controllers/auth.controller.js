 import {exchangeCodeForAccessToken} from "../services/auth.service.js";
 
 // keycloak configuration
 
 //end point to obtain JWT token from keycloak
 export const  ObtainJwt = async (req, res) => {

    const keycloakConfig = {
        clientId: process.env.KEYCLOAK_EXCHANGE_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_API_CLIENT_SECRET,
        redirectUri: `http://localhost:${process.env.FRONT_PORT}/auth/callback`,
        tokenEndpoint: `http://localhost:${process.env.KEYCLOAK_PORT}/realms/${process.env.REALM_NAME}/protocol/openid-connect/token`,
    };

    const { code } = req.body;
    console.log(keycloakConfig)
    try{
    const {access_token,refresh_token} = await (exchangeCodeForAccessToken(code , keycloakConfig));
    }catch(error){
        return res.status(500).json({status:"error" ,message: error.message });
    }

    if (!access_token || !refresh_token) {
        return res.status(400).json({ status: "error", message: "Invalid authorization code" });
    }
    // Set the access token as a cookie
    res.cookie("access_token", access_token, { httpOnly: true, secure: true });
    res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true });
    // Send a response indicating success
    res.status(200).json({ status: "success", message: "Tokens obtained successfully" });
 }