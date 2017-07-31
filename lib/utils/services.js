export function dumpNewUser(user) {
    const { name, email, password, tel, access } = user;

    return {
        name,
        email,
        password,
        tel,
        access
    };
}
