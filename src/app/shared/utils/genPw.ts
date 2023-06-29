export const randomPassword = () => {
    const length = 18;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_@$%&-";
    let psw = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        psw += charset.charAt(Math.floor(Math.random() * n));
    }
    return psw;
}