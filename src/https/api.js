import axios from "axios";

const api = (url, method = "POST", body = {}, headers = {}) => {
    return new Promise(async function (resolve, reject) {
        try {
            const request = {
                method: method.toUpperCase(),
                url,
                headers: headers,
                data: body
            };

            const response = await axios(request);
            console.log("responseresponse", response);
            if (response) {
                switch (response.status) {
                    case 200:
                        resolve(response);
                    case 201:
                        resolve(response);
                    case 204:
                        resolve(response);
                    case 422:
                        resolve(response);
                        break;
                    default:
                        reject(response);
                        break;
                }
            } else {
                reject(response);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export default api