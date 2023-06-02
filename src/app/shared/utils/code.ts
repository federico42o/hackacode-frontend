export const generateCode = () : string => {
    const randomString = Math.random().toString(36).substring(3, 9);
    const timestamp = Date.now();

    return randomString + timestamp;
}