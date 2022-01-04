import got, { Got } from 'got';

import { GotAdapter } from './GotAdapter';

jest.mock(
  'got',
  (): jest.Mocked<Pick<Got, 'get' | 'post'>> => ({
    get: jest.fn().mockReturnValue({ body: { value: 'any_get_result' } }),
    post: jest.fn().mockReturnValue({ body: { value: 'any_post_result' } }),
  })
);

const makeSut = () => {
  const url = 'any_url';
  const options = { headers: { value: 'any_header' }, body: 'any_body' };

  const sut = new GotAdapter();

  return { sut, url, options };
};

describe(`${GotAdapter.name} Tests`, () => {
  describe(GotAdapter.prototype.get.name, () => {
    it('Should return an object when method is called', async () => {
      const { sut, url } = makeSut();

      const result = await sut.get<string>(url);

      expect(result).toEqual({ body: { value: 'any_get_result' } });
    });

    it('Should call got.get when method is called with options', async () => {
      const { sut, url, options } = makeSut();
      const getSpy = jest.spyOn(got, 'get');

      await sut.get(url, options);

      expect(getSpy).toBeCalledWith(url, {
        headers: { value: 'any_header' },
        body: 'any_body',
        responseType: 'json',
      });
    });

    it('Should call got.get when method is called without options', async () => {
      const { sut, url } = makeSut();
      const getSpy = jest.spyOn(got, 'get');

      await sut.get(url);

      expect(getSpy).toBeCalledWith(url, { responseType: 'json' });
    });
  });

  describe(GotAdapter.prototype.post.name, () => {
    it('Should return an object when method is called', async () => {
      const { sut, url } = makeSut();

      const result = await sut.post<string, string>(url);

      expect(result).toEqual({ body: { value: 'any_post_result' } });
    });

    it('Should call got.post when method is called with options', async () => {
      const { sut, url, options } = makeSut();
      const postSpy = jest.spyOn(got, 'post');

      await sut.post(url, options);

      expect(postSpy).toBeCalledWith(url, {
        headers: { value: 'any_header' },
        json: 'any_body',
        responseType: 'json',
      });
    });

    it('Should call got.post when method is called without options', async () => {
      const { sut, url } = makeSut();
      const postSpy = jest.spyOn(got, 'post');

      await sut.post(url);

      expect(postSpy).toBeCalledWith(url, {
        headers: undefined,
        json: undefined,
        responseType: 'json',
      });
    });
  });
});
