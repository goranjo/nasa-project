import moment from 'moment';

export const formatEarthDate = (date: string | Date | null | undefined): string => {
    if (date === undefined || date === null) {
        return '';
    }
    return moment(date).format('YYYY-MM-DD');
};
