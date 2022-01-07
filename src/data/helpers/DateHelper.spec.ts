import * as DateFnsModule from 'date-fns';

import { DateHelper } from './DateHelper';

jest.mock('date-fns');
jest.useFakeTimers().setSystemTime(new Date().getTime());

const makeSut = () => {
  const sut = DateHelper;

  return { sut };
};

describe(DateHelper.name, () => {
  describe(DateHelper.isDateOverdue.name, () => {
    it('Should call isBefore when method is invoked', () => {
      const { sut } = makeSut();
      const date = new Date('01/01/2022');
      const isBeforeSpy = jest
        .spyOn(DateFnsModule, 'isBefore')
        .mockReturnValueOnce(false);

      sut.isDateOverdue(date);

      expect(isBeforeSpy).toBeCalledWith(date, new Date());
    });

    it('Should return false when isBefore returns false', () => {
      const { sut } = makeSut();
      const date = new Date('01/01/2022');
      jest.spyOn(DateFnsModule, 'isBefore').mockReturnValueOnce(false);

      const result = sut.isDateOverdue(date);

      expect(result).toBe(false);
    });

    it('Should return true when isBefore returns true', () => {
      const { sut } = makeSut();
      const date = new Date('05/01/2022');
      jest.spyOn(DateFnsModule, 'isBefore').mockReturnValueOnce(true);

      const result = sut.isDateOverdue(date);

      expect(result).toBe(true);
    });

    it('Should throw when isBefore throws', () => {
      const { sut } = makeSut();
      const date = new Date('05/01/2022');
      jest.spyOn(DateFnsModule, 'isBefore').mockImplementation(() => {
        throw new Error('any_isBefore_error');
      });

      const result = sut.isDateOverdue;

      expect(() => result(date)).toThrow(new Error('any_isBefore_error'));
    });
  });

  describe(DateHelper.formatDate, () => {
    it('Should call toLocaleString when method is invoked', () => {
      const { sut } = makeSut();
      const date = new Date('Jun 1 2020');
      const toLocaleStringSpy = jest.spyOn(Date.prototype, 'toLocaleString');

      sut.formatDate(date);

      expect(toLocaleStringSpy).toBeCalledWith('en-us', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    });

    it('Should call replace when method is invoked', () => {
      const { sut } = makeSut();
      const date = new Date('Jun 1 2020');
      const replaceSpy = jest.spyOn(String.prototype, 'replace');

      sut.formatDate(date);

      expect(replaceSpy).toBeCalledWith(/(\d+)\/(\d+)\/(\d+)/, '$2-$1-$3');
    });

    it('Should return formatted date when method is invoked', () => {
      const { sut } = makeSut();
      const date = new Date('Jun 1 2020');

      const result = sut.formatDate(date);

      expect(result).toBe('01-06-2020');
    });
  });
});
