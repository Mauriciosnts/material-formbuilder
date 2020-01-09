
class AdministrativeApi{

    static getUserAccess(payload){
        const url = "/api/user/getcredentials"
        const headers = new Headers()
        headers.append("content-type", "application/x-www-form-urlencoded");

        return fetch(url, {
            method: "POST",
            headers: headers,
            body: payload
        }).then(response => response.json())
    }
    
}