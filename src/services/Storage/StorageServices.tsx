export const GetStorage = (storage: string) => {
    const data = localStorage.getItem(storage);
    try {
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const SaveStorage = (storage: string, data: any) => {
    try {
        if (data) {
            localStorage.setItem(storage, JSON.stringify(data));
        }
    } catch (error) {
        console.log(error);
    }
}

export const DeleteStorage = (storage: string) => {
    try {
        localStorage.removeItem(storage);
    } catch (error) {
        console.log(error);
    }
}