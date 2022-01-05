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
    it('Should call isAfter when method is invoked', () => {
      const { sut } = makeSut();
      const date = new Date('01/01/2022');
      const isAfterSpy = jest
        .spyOn(DateFnsModule, 'isAfter')
        .mockReturnValueOnce(false);

      sut.isDateOverdue(date);

      expect(isAfterSpy).toBeCalledWith(date, new Date());
    });

    it('Should return false when isAfter returns false', () => {
      const { sut } = makeSut();
      const date = new Date('01/01/2022');
      jest.spyOn(DateFnsModule, 'isAfter').mockReturnValueOnce(false);

      const result = sut.isDateOverdue(date);

      expect(result).toBe(false);
    });

    it('Should return true when isAfter returns true', () => {
      const { sut } = makeSut();
      const date = new Date('05/01/2022');
      jest.spyOn(DateFnsModule, 'isAfter').mockReturnValueOnce(true);

      const result = sut.isDateOverdue(date);

      expect(result).toBe(true);
    });

    it('Should throw when isAfter throws', () => {
      const { sut } = makeSut();
      const date = new Date('05/01/2022');
      jest.spyOn(DateFnsModule, 'isAfter').mockImplementation(() => {
        throw new Error('any_isAfter_error');
      });

      const result = sut.isDateOverdue;

      expect(() => result(date)).toThrow(new Error('any_isAfter_error'));
    });
  });
});
