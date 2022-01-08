import { isBefore } from 'date-fns';

export class DateHelper {
  public static isDateOverdue = (date: Date) => {
    const dateReference = this.getActualDateReference();

    return isBefore(date, dateReference);
  };

  private static getActualDateReference(): Date {
    return new Date();
  }

  public static formatDate(date: Date) {
    const localeString = this.toLocale(date);
    const result = this.formatDateString(localeString);

    return result;
  }

  private static toLocale(date: Date): string {
    const result = date.toLocaleString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return result;
  }

  private static formatDateString(localeString: string) {
    const result = localeString.replace(/(\d+)\/(\d+)\/(\d+)/, '$2-$1-$3');

    return result;
  }
}
