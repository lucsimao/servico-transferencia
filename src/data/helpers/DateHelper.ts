import { isAfter } from 'date-fns';

export class DateHelper {
  public static isDateOverdue = (date: Date) => {
    const dateReference = this.getActualDateReference();

    return isAfter(date, dateReference);
  };

  private static getActualDateReference(): Date {
    return new Date();
  }
}
