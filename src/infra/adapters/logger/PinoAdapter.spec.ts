import PinoAdapter from './PinoAdapter';
import pino from 'pino';

jest.mock('pino', () => {
  return jest.fn().mockReturnValue({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  });
});
const makeSut = () => {
  const sut = new PinoAdapter();

  return { sut };
};

describe(PinoAdapter.name, () => {
  describe(PinoAdapter.prototype.info.name, () => {
    it('Should call info when logger.info is called', () => {
      const { sut } = makeSut();
      const infoSpy = jest.spyOn(pino(), 'info');

      sut.info({ msg: 'any_info_log' });

      expect(infoSpy).toBeCalledWith({ msg: 'any_info_log' });
    });

    it('Should throw when logger.info throws', () => {
      const { sut } = makeSut();
      jest.spyOn(pino(), 'info').mockImplementationOnce(() => {
        throw new Error('any_info_log_error');
      });

      expect(() => sut.info({ msg: 'any_info_log' })).toThrow(
        new Error('any_info_log_error')
      );
    });
  });

  describe(PinoAdapter.prototype.warning.name, () => {
    it('Should call warning when logger.warning is called', () => {
      const { sut } = makeSut();
      const warnSpy = jest.spyOn(pino(), 'warn');
      sut.warning({ msg: 'any_warning_log' });

      expect(warnSpy).toBeCalledWith({ msg: 'any_warning_log' });
    });

    it('Should throw when logger.warning throws', () => {
      const { sut } = makeSut();
      jest.spyOn(pino(), 'warn').mockImplementationOnce(() => {
        throw new Error('any_warning_log_error');
      });

      expect(() => sut.warning({ msg: 'any_warning_log' })).toThrow(
        new Error('any_warning_log_error')
      );
    });
  });

  describe(PinoAdapter.prototype.error.name, () => {
    it('Should call error when logger.error is called', () => {
      const { sut } = makeSut();
      const errorSpy = jest.spyOn(pino(), 'error');

      sut.error({ msg: 'any_error_log' });

      expect(errorSpy).toBeCalledWith({ msg: 'any_error_log' });
    });

    it('Should throw when logger.error throws', () => {
      const { sut } = makeSut();
      jest.spyOn(pino(), 'error').mockImplementationOnce(() => {
        throw new Error('any_error_log_error');
      });

      expect(() => sut.error({ msg: 'any_error_log' })).toThrow(
        new Error('any_error_log_error')
      );
    });
  });
});
