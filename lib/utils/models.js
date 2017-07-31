export function genarateFilename(name) {
    const devidedName = name.originalname.split('.');
    const timestamp = Date.now();

    devidedName[0] = `${devidedName[0]}-${timestamp}`;
    const newName = devidedName.join('.');

    return newName;
}
