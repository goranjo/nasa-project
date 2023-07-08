import moment from 'moment';
export const formatEarthDate = (date: string | Date | null): string => {
    return moment(date).format('YYYY-MM-DD');
};
