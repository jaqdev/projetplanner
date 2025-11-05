let accessToken;

export function setAccessToken(token){
    if(!token){
        console.log("Token invalido");
    }
    localStorage.setItem("acces_token", token);
    accessToken = token;
}

export function getAccessToken(){
    if(accessToken){
        return accessToken;
    }

    accessToken =  localStorage.getItem("acces_token");

    return accessToken;
}