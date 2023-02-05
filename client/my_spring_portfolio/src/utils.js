import { format } from 'date-fns';

const formatCurrency = (num) => {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
const formatPercentage = (num) => {
    return (num * 100).toFixed(2) + '%';
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"});
}
const date = new Date();
const formattedDate = format(date, 'yyyy-MM-dd');

export { formatCurrency, formatPercentage, formatDate, formattedDate };
