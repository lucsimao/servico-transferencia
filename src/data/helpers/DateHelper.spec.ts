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
    it('Should return formatted date when method is invoked', async () => {
      const { sut } = makeSut();
      const date = new Date('Jun 1 2020');

      const result = await sut.formatDate(date);

      expect(result).toBe('01-06-2020');
    });
  });
});
