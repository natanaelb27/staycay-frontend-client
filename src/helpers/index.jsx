import moment from 'moment';

export const numberWithCommas = (number) => `${parseInt(number, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`;
export const getDayBetweenDates = (checkInDate, checkOutDate) => moment(checkInDate).diff(moment(checkOutDate), 'days');
export const getDatesBetween = (startDate, lastDate) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  const stopDate = moment(lastDate);
  while (currentDate <= stopDate) {
    dateArray.push(new Date(moment(currentDate).format('YYYY-MM-DD')));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};

export const dateToDateStringArray = (dateArray) => {
  const newDateArray = [];
  dateArray.map((item) => newDateArray.push(item.toDateString()));
  return newDateArray;
};

export const verifyValidPassword = (password) => {
  const hasMinLen = password.length >= 8;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const hasSymbol = format.test(password);

  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;

  for (let i = 0; i < password.length; i += 1) {
    const c = password.at(i);
    if (c >= '0' && c <= '9') {
      hasNumber = true;
    } else {
      if (c === c.toUpperCase()) {
        hasUpper = true;
      }

      if (c === c.toLowerCase()) {
        hasLower = true;
      }
    }
  }

  return hasNumber && hasMinLen && hasUpper && hasLower && !hasSymbol;
};
