import moment from 'moment';

export const numberWithCommas = (number) => `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`;
export const getDayBetweenDates = (checkInDate, checkOutDate) => moment(checkInDate).diff(moment(checkOutDate), 'days');
