import { isBefore } from 'date-fns';

export class DateHelper {
  public static isDateOverdue = (date: Date) => {
    const dateReference = this.getActualDateReference();

    return isBefore(date, dateReference);
  };

  private static getActualDateReference(): Date {
    return new Date();
  }
}
