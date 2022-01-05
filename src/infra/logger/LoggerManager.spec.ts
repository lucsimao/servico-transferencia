import { Logger } from './../../data/interfaces/logger/Logger';
import { LoggerManager } from './LoggerManager';
const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

const makeSut = () => {
  const loggerStub = makeLoggerStub();
  const sut = new LoggerManager(loggerStub);

  return { sut, loggerStub };
};

describe(LoggerManager.name, () => {
  describe(LoggerManager.prototype.info.name, () => {
    it('Should have empty logger list  when no logger is ', () => {
      const sut = new LoggerManager();

      const result = sut.getLoggers();

      expect(result.length).toBe(0);
    });

    it('Should have filled logger list when no logger is ', () => {
      const { sut } = makeSut();

      const result = sut.getLoggers();

      expect(result.length).toBe(1);
    });

    it('Should call info when logger.info is called', () => {
      const { sut, loggerStub } = makeSut();

      sut.info({ msg: 'any_info_log' });

      expect(loggerStub.info).toBeCalledWith({ msg: 'any_info_log' });
      expect(sut.getLoggers().length).toBe(1);
    });

    it('Should throw when logger.info throws', () => {
      const { sut, loggerStub } = makeSut();
      loggerStub.info.mockImplementationOnce(() => {
        throw new Error('any_info_log_error');
      });

      expect(() => sut.info({ msg: 'any_info_log' })).toThrow(
        new Error('any_info_log_error')
      );
    });
  });

  describe(LoggerManager.prototype.warning.name, () => {
    it('Should call warning when logger.warning is called', () => {
      const { sut, loggerStub } = makeSut();

      sut.warning({ msg: 'any_warning_log' });

      expect(loggerStub.warning).toBeCalledWith({ msg: 'any_warning_log' });
    });

    it('Should throw when logger.warning throws', () => {
      const { sut, loggerStub } = makeSut();
      loggerStub.warning.mockImplementationOnce(() => {
        throw new Error('any_warning_log_error');
      });

      expect(() => sut.warning({ msg: 'any_warning_log' })).toThrow(
        new Error('any_warning_log_error')
      );
    });
  });

  describe(LoggerManager.prototype.error.name, () => {
    it('Should call error when logger.error is called', () => {
      const { sut, loggerStub } = makeSut();

      sut.error({ msg: 'any_error_log' });

      expect(loggerStub.error).toBeCalledWith({ msg: 'any_error_log' });
    });

    it('Should throw when logger.error throws', () => {
      const { sut, loggerStub } = makeSut();
      loggerStub.error.mockImplementationOnce(() => {
        throw new Error('any_error_log_error');
      });

      expect(() => sut.error({ msg: 'any_error_log' })).toThrow(
        new Error('any_error_log_error')
      );
    });
  });
});
