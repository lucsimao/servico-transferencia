import App from './Application';
import Main from './Main';

jest.mock('./Application');
jest.mock('../infra/logger/LoggerManager');

const makeSut = () => {
  const sut = Main;

  return { sut };
};

describe(Main.name, () => {
  describe(Main.start.name, () => {
    it('Should call app.setup is called', async () => {
      const { sut } = makeSut();
      const appSetupSpy = jest.spyOn(App.prototype, 'setup');

      await sut.start();

      expect(appSetupSpy).toBeCalledWith();
    });

    it('Should call app.start when method is invoked', async () => {
      const { sut } = makeSut();
      const appStartSpy = jest.spyOn(App.prototype, 'start');

      await sut.start();

      expect(appStartSpy).toBeCalledWith();
    });

    it('Should call process.on when success', async () => {
      const { sut } = makeSut();
      const processOnSpy = jest.spyOn(process, 'on');

      await sut.start();

      expect(processOnSpy).toHaveBeenCalledWith(
        'uncaughtException',
        expect.any(Function)
      );
      expect(processOnSpy).toHaveBeenCalledWith(
        'unhandledRejection',
        expect.any(Function)
      );
      expect(processOnSpy).toHaveBeenCalledWith('SIGINT', expect.any(Function));
      expect(processOnSpy).toHaveBeenCalledWith(
        'SIGTERM',
        expect.any(Function)
      );
      expect(processOnSpy).toHaveBeenCalledWith(
        'SIGQUIT',
        expect.any(Function)
      );
    });

    it('Should call process.exit when app.setup throws', async () => {
      const { sut } = makeSut();
      jest
        .spyOn(App.prototype, 'setup')
        .mockRejectedValueOnce(new Error('any_start_error'));
      const processExitSpy = jest
        .spyOn(process, 'exit')
        .mockImplementationOnce((number) => {
          throw new Error(`process.exit: ${number}`);
        });

      const promise = sut.start();

      await expect(promise).rejects.toThrow(new Error('process.exit: 1'));
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });
});
