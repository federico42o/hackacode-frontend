export const randomEmail = (name : string, lastname:string) => {
    const length = 8;
    const charset = name + lastname;
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal + "@crazyland.com";
}

