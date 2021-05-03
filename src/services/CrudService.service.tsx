
export const GetStorageCrud = (keyStorage: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const data = localStorage.getItem(keyStorage) || '';
                const result = JSON.parse(data) as any[];
                resolve(result);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        }, 3000);
    })
}

export const SaveStorageCrud = (keyStorage: string, data: any[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (data) {
                    localStorage.setItem(keyStorage, JSON.stringify(data));
                }
                resolve();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        }, 3000);
    })
}
