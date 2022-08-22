# web-storage-browser-cookies

Use cookies in the browser through the Storage interface of the Web Storage Api.

- [Installation](#installation)
- [Usage](#usage)

## Installation

```
npm i cookie-parser web-storage-browser-cookies
```

## Usage

Pass the `window` object to the constructor.

```js
import { BrowserCookies } from 'web-storage-browser-cookies';

const storage = new BrowserCookies({ window });
// when we have set three items: fruit=banana,drink=coffee,food=hamburger
console.log(storage.getItem('fruit')); // -> banana
storage.setItem('girl', 'alice');
// now the storage will contain: fruit=banana,drink=coffee,food=hamburger,girl=alice
storage.removeItem('drink');
// now the storage will contain: fruit=banana,food=hamburger,girl=alice
storage.clear();
// now the storage will be empty
```

An options object can be passed that will be used on `setItem`, `removeItem` and `clear`.
For all possible values please see all possible [cookie attributes](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#write_a_new_cookie)

```js
import { BrowserCookies } from 'web-storage-browser-cookies';

const storage = new BrowserCookies({ window, options: { path: '/mydir' } });
```

A custom prefix can be passed to override the default one `__cookie-storage__`.

```js
import { BrowserCookies } from 'web-storage-browser-cookies';

const storage = new BrowserCookies({ window, prefix: '__custom-prefix__' });
```
