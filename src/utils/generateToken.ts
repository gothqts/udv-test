export function generateAndStoreUserData(email: string) {
    const token = Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2);

    const expirationTime = new Date().getTime() + 3600000;

    const tokenData = {
        token: token,
        expiresAt: expirationTime
    };
    const login = {
        username: email,
    }

    sessionStorage.setItem('authToken', JSON.stringify(tokenData));
    sessionStorage.setItem('currentUser', JSON.stringify(login));


    return token;
}
