export class BrowserCookies {
  #window = null;
  #options = null;
  #prefix = null;

  constructor({ window, prefix, options }) {
    this.#window = window;
    this.#prefix = prefix ?? '__cookie-storage__';
    this.#options = options;
  }

  #getCookies() {
    return this.#window.document.cookie
      .split('; ')
      .reduce((cookies, cookiepart) => {
        const [name, value] = cookiepart.split('=');
        return {
          ...cookies,
          [name]: value,
        };
      }, {});
  }

  #getOptions(overrides) {
    return Object.entries({ ...this.#options, ...overrides }).reduce(
      (acc, [key, value]) => `${acc};${key}=${value}`,
      ''
    );
  }

  getItem(name) {
    const cookies = this.#getCookies();
    return cookies[`${this.#prefix}${name}`];
  }

  setItem(name, value) {
    this.#window.document.cookie = `${
      this.#prefix
    }${name}=${value}${this.#getOptions()}`;
  }

  removeItem(name) {
    this.#window.document.cookie = `${this.#prefix}${name}=${this.#getOptions({
      expires: 0,
      'max-age': 0,
    })}`;
  }

  clear() {
    const cookies = this.#getCookies();
    Object.keys(cookies).forEach((key) => {
      this.#window.document.cookie = `${key}=${this.#getOptions({
        expires: 0,
        'max-age': 0,
      })}`;
    });
  }

  key(index) {
    const cookies = Object.keys(this.#getCookies());
    const key = cookies[index] ?? null;
    return key ? key.slice(this.#prefix.length) : null;
  }
}
