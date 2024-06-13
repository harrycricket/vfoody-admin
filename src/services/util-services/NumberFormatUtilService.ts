const numberFormatUtilService = {
  formatNumberWithDotEach3digits: (number: number): string => {
    return number.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  },
  formatThousandNumberWithDotEach3digits: (number: number): string => {
    number = number / 1_000;
    return number.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  },
  formatMillionNumberWithDotEach3digits: (number: number): string => {
    number = number / 1_000_000;
    return number.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  },
};
export default numberFormatUtilService;
