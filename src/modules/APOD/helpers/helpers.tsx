import moment from 'moment';

export function formatDateStringToHumanReadable(dateString: string, format: string): string {
    const date = moment(dateString);
    return date.format(format);
}
