import { jwtDecode } from 'jwt-decode';

export const LoginCheck = () => {
    const jwt = localStorage.getItem('jwt'); // de schimbat asta
    if (jwt !== null) {
        const decodedToken = jwtDecode(jwt);
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;
        if (expirationTime != null) {
            if (expirationTime >= currentTime) {
                return true;
            }
        }
    }
    return false;
}