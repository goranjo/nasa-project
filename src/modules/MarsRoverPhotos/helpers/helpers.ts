import moment from 'moment';

export const formatEarthDate = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD');
};
