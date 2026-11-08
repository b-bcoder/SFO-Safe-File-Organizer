# Third-Party Notices

SFO - Safe File Organizer includes or distributes the third-party software
listed below. Each component remains subject to its own license; those terms
are separate from the SFO license in [LICENSE.txt](./LICENSE.txt).

## Application dependencies

### sql.js 1.15.2

- Project: https://github.com/sql-js/sql.js
- License: MIT
- Copyright: Copyright (c) 2017 sql.js authors

MIT License

Copyright (c) 2017 sql.js authors (see AUTHORS in the sql.js project)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### SQLite

- Project: https://sqlite.org/
- License: Public domain

`sql.js` compiles SQLite to WebAssembly. SQLite itself is in the public domain;
the `sql.js` JavaScript and WebAssembly distribution is MIT-licensed as stated
above. See https://sqlite.org/copyright.html.

## Electron runtime

### Electron 45.2.3

- Project: https://github.com/electron/electron
- License: MIT

The Electron runtime distributed with SFO also includes Chromium, Node.js,
and other third-party components. Their individual notices and license texts
are provided in the Electron distribution files `LICENSE.electron.txt` and
`LICENSES.chromium.html`, which are included alongside the packaged
application.

## Scope

This notice covers the application dependencies and runtime distributed with
SFO. Development and packaging tools that are not included in the distributed
application are not listed here. Their package-level license information is
available in `package-lock.json` and in the corresponding packages.
