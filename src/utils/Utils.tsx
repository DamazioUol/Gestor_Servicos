import { v4 as uuidv4 } from 'uuid';

export const formatDateWithHours = (date?: Date) => {
    if (date) {
        date = new Date(date);
        return date?.toLocaleString().substring(0, 16);
    }
    return "";
}

export const formatCurrencyMoneyWithSymbols = (number?: string | number) => {
    if (number) {
        const newNumber = typeof number === 'string' ? Number(number.replace('.', '').replace(',', '.')) : Number(number.toFixed(2));
        const formater = new Intl.NumberFormat('pt-BR');
        let result = formater.format(newNumber);
        result = result.includes(',') ? `${result.split(',')[0]},${(result.split(',')[1].length > 1 ? result.split(',')[1] : result.split(',')[1] + '0')}` : `${result},00`
        return `R$ ${result}`;
    }
    return `R$ 0,00`;
}

export const generateGuid = () => {
    return uuidv4();
}