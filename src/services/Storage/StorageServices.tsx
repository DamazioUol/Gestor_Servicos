export const GetStorage = (storage: string) => {
    const data = localStorage.getItem(storage) || '';
    try {
        const result = JSON.parse(data) as any[];
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const SaveStorage = (storage: string, data: any[]) => {
    try {
        if (data) {
            localStorage.setItem(storage, JSON.stringify(data));
        }
    } catch (error) {
        console.log(error);
    }
}