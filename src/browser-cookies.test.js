import { describe, test, jest, expect } from '@jest/globals';
import { BrowserCookies } from './browser-cookies.js';

describe('browser cookies', () => {
  const prefix = '__test_prefix__';
  const setCookieSpy = jest.fn();

  test('get existing item', () => {
    const cookie = '__cookie-storage__test=example';
    const document = {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        setCookieSpy(value);
      },
    };
    const storage = new BrowserCookies({
      window: {
        document,
      },
    });
    expect(storage.getItem('test')).toEqual('example');
  });

  test('get existing item with custom prefix', () => {
    const cookie = '__test_prefix__test=example';
    const document = {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        setCookieSpy(value);
      },
    };
    const storage = new BrowserCookies({
      prefix,
      window: {
        document,
      },
    });
    expect(storage.getItem('test')).toEqual('example');
  });

  test('set item', () => {
    const options = {};
    const cookie = '';
    const document = {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        setCookieSpy(value);
      },
    };

    const storage = new BrowserCookies({
      prefix,
      window: {
        document,
      },
      options,
    });
    expect(storage.setItem('test', 'example')).toEqual(undefined);
    expect(setCookieSpy).toBeCalledTimes(1);
    expect(setCookieSpy).toBeCalledWith('__test_prefix__test=example');
  });

  test('remove item', () => {
    const options = {};
    const cookie = '__test_prefix__test=example';
    const document = {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        setCookieSpy(value);
      },
    };
    const storage = new BrowserCookies({
      prefix,
      window: {
        document,
      },
      options,
    });
    expect(storage.removeItem('test')).toEqual(undefined);
    expect(setCookieSpy).toBeCalledTimes(1);
    expect(setCookieSpy).toBeCalledWith(
      '__test_prefix__test=;expires=0;max-age=0'
    );
  });

  test('clear storage', () => {
    const options = {};
    const cookie = '__test_prefix__test=example; __test_prefix__test2=example';
    const document = {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        setCookieSpy(value);
      },
    };
    const storage = new BrowserCookies({
      prefix,
      window: {
        document,
      },
      options,
    });
    expect(storage.clear()).toEqual(undefined);
    expect(setCookieSpy).toBeCalledTimes(2);
    expect(setCookieSpy).toBeCalledWith(
      '__test_prefix__test=;expires=0;max-age=0'
    );
    expect(setCookieSpy).toBeCalledWith(
      '__test_prefix__test2=;expires=0;max-age=0'
    );
  });

  test('get item key by index', () => {
    const cookie = '__test_prefix__test1=example; __test_prefix__test2=example';
    const document = {
      get cookie() {
        return cookie;
      },
      set cookie(value) {
        setCookieSpy(value);
      },
    };
    const storage = new BrowserCookies({
      prefix,
      window: {
        document,
      },
    });
    expect(storage.key(0)).toEqual('test1');
    expect(storage.key(1)).toEqual('test2');
    expect(storage.key(2)).toEqual(null);
  });
});
