/* eslint-disable */
module.exports = {
  name: '@yarnpkg/plugin-push',
  factory: function (require) {
    var plugin
    plugin = (() => {
      var t = {
          393: (t, e, r) => {
            'use strict'
            r.r(e), r.d(e, { PushCommand: () => h, default: () => g })
            var n = r(622),
              o = r.n(n),
              s = r(87),
              i = r.n(s),
              c = r(725),
              a = r.n(c),
              u = r(282),
              p = r(966),
              l = r(688),
              f = r(42)
            function d(t, e) {
              const r = t.indexOf(':'),
                n = -1 === r ? t : t.substring(0, r),
                s = o().extname(n),
                i =
                  '' === s
                    ? o().basename(n)
                    : o().basename(n).slice(0, -s.length)
              return [
                n,
                (-1 === r ? `${i}_{version}${s}` : t.substring(r + 1)).replace(
                  /\{version\}/gi,
                  e
                ),
              ]
            }
            var m = function (t, e, r, n) {
              var o,
                s = arguments.length,
                i =
                  s < 3
                    ? e
                    : null === n
                    ? (n = Object.getOwnPropertyDescriptor(e, r))
                    : n
              if (
                'object' == typeof Reflect &&
                'function' == typeof Reflect.decorate
              )
                i = Reflect.decorate(t, e, r, n)
              else
                for (var c = t.length - 1; c >= 0; c--)
                  (o = t[c]) &&
                    (i = (s < 3 ? o(i) : s > 3 ? o(e, r, i) : o(e, r)) || i)
              return s > 3 && i && Object.defineProperty(e, r, i), i
            }
            class h extends f.Command {
              constructor() {
                super(...arguments),
                  (this.version = i().userInfo().username),
                  (this.files = [])
              }
              async execute() {
                const { cwd: t } = this.context,
                  e = await p.Configuration.find(t, null),
                  { project: r } = await p.Project.find(e, t)
                if (this.require) {
                  const e = (u.createRequire || u.createRequireFromPath)(t),
                    n = r.topLevelWorkspace.cwd,
                    o = ['./.pnp.js', './.pnp.cjs']
                  'module' === r.topLevelWorkspace.manifest.type && o.reverse()
                  for (const t of o) {
                    const r = l.ppath.resolve(n, t)
                    if (await l.xfs.existsPromise(r)) {
                      e(r).setup()
                      break
                    }
                  }
                  e(e.resolve(this.require, { paths: [t] }))
                }
                if (
                  (this.bucket || (this.bucket = process.env.PKG_BUCKET),
                  !this.bucket)
                )
                  throw new f.UsageError(
                    'Need to pass a cloud storage bucket, e.g. --bucket=gs://pkg.example.com'
                  )
                if (0 === this.files.length)
                  throw new f.UsageError('Need to pass the list of files.')
                const n = (function (t) {
                  const e = t.includes('://')
                    ? t.endsWith('/')
                      ? t
                      : t + '/'
                    : t.endsWith('/')
                    ? 'gs://' + t
                    : `gs://${t}/`
                  if (!e.startsWith('gs://'))
                    throw new Error(
                      'Only Google Cloud Storage buckets are supported at the moment.'
                    )
                  return e
                })(this.bucket)
                for (const e of this.files) {
                  const [r, o] = d(e, this.version),
                    s = l.ppath.resolve(t, r),
                    c = `${n}${o}`
                  if (!(await l.xfs.existsPromise(s)))
                    throw new Error('File not found: ' + r)
                  this.context.stdout.write(`${r} -> ${c}${i().EOL}`)
                  const u = await new Promise((e, n) => {
                    a()('gsutil', ['cp', r, c], {
                      cwd: l.npath.fromPortablePath(t),
                      stdio: [
                        this.context.stdin,
                        this.context.stdout,
                        this.context.stderr,
                      ],
                    })
                      .on('error', (t) => {
                        n(t)
                      })
                      .on('close', (t) => {
                        e(t)
                      })
                  })
                  if (0 !== u) return u
                }
              }
            }
            ;(h.usage = f.Command.Usage({
              description: 'Uploads packages to a cloud storage bucket.',
            })),
              m(
                [f.Command.String('-r,--require')],
                h.prototype,
                'require',
                void 0
              ),
              m([f.Command.String('--bucket')], h.prototype, 'bucket', void 0),
              m(
                [f.Command.String('--version')],
                h.prototype,
                'version',
                void 0
              ),
              m([f.Command.Rest()], h.prototype, 'files', void 0),
              m([f.Command.Path('push')], h.prototype, 'execute', null)
            const g = { commands: [h] }
          },
          725: (t, e, r) => {
            'use strict'
            const n = r(129),
              o = r(626),
              s = r(70)
            function i(t, e, r) {
              const i = o(t, e, r),
                c = n.spawn(i.command, i.args, i.options)
              return s.hookChildProcess(c, i), c
            }
            ;(t.exports = i),
              (t.exports.spawn = i),
              (t.exports.sync = function (t, e, r) {
                const i = o(t, e, r),
                  c = n.spawnSync(i.command, i.args, i.options)
                return (c.error = c.error || s.verifyENOENTSync(c.status, i)), c
              }),
              (t.exports._parse = o),
              (t.exports._enoent = s)
          },
          70: (t) => {
            'use strict'
            const e = 'win32' === process.platform
            function r(t, e) {
              return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
                code: 'ENOENT',
                errno: 'ENOENT',
                syscall: `${e} ${t.command}`,
                path: t.command,
                spawnargs: t.args,
              })
            }
            function n(t, n) {
              return e && 1 === t && !n.file ? r(n.original, 'spawn') : null
            }
            t.exports = {
              hookChildProcess: function (t, r) {
                if (!e) return
                const o = t.emit
                t.emit = function (e, s) {
                  if ('exit' === e) {
                    const e = n(s, r)
                    if (e) return o.call(t, 'error', e)
                  }
                  return o.apply(t, arguments)
                }
              },
              verifyENOENT: n,
              verifyENOENTSync: function (t, n) {
                return e && 1 === t && !n.file
                  ? r(n.original, 'spawnSync')
                  : null
              },
              notFoundError: r,
            }
          },
          626: (t, e, r) => {
            'use strict'
            const n = r(622),
              o = r(598),
              s = r(103),
              i = r(808),
              c = 'win32' === process.platform,
              a = /\.(?:com|exe)$/i,
              u = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i
            function p(t) {
              if (!c) return t
              const e = (function (t) {
                  t.file = o(t)
                  const e = t.file && i(t.file)
                  return e
                    ? (t.args.unshift(t.file), (t.command = e), o(t))
                    : t.file
                })(t),
                r = !a.test(e)
              if (t.options.forceShell || r) {
                const r = u.test(e)
                ;(t.command = n.normalize(t.command)),
                  (t.command = s.command(t.command)),
                  (t.args = t.args.map((t) => s.argument(t, r)))
                const o = [t.command].concat(t.args).join(' ')
                ;(t.args = ['/d', '/s', '/c', `"${o}"`]),
                  (t.command = process.env.comspec || 'cmd.exe'),
                  (t.options.windowsVerbatimArguments = !0)
              }
              return t
            }
            t.exports = function (t, e, r) {
              e && !Array.isArray(e) && ((r = e), (e = null))
              const n = {
                command: t,
                args: (e = e ? e.slice(0) : []),
                options: (r = Object.assign({}, r)),
                file: void 0,
                original: { command: t, args: e },
              }
              return r.shell ? n : p(n)
            }
          },
          103: (t) => {
            'use strict'
            const e = /([()\][%!^"`<>&|;, *?])/g
            ;(t.exports.command = function (t) {
              return (t = t.replace(e, '^$1'))
            }),
              (t.exports.argument = function (t, r) {
                return (
                  (t = (t = `"${(t = (t = (t = '' + t).replace(
                    /(\\*)"/g,
                    '$1$1\\"'
                  )).replace(/(\\*)$/, '$1$1'))}"`).replace(e, '^$1')),
                  r && (t = t.replace(e, '^$1')),
                  t
                )
              })
          },
          808: (t, e, r) => {
            'use strict'
            const n = r(747),
              o = r(383)
            t.exports = function (t) {
              const e = Buffer.alloc(150)
              let r
              try {
                ;(r = n.openSync(t, 'r')),
                  n.readSync(r, e, 0, 150, 0),
                  n.closeSync(r)
              } catch (t) {}
              return o(e.toString())
            }
          },
          598: (t, e, r) => {
            'use strict'
            const n = r(622),
              o = r(765),
              s = r(463)
            function i(t, e) {
              const r = t.options.env || process.env,
                i = process.cwd(),
                c = null != t.options.cwd,
                a = c && void 0 !== process.chdir && !process.chdir.disabled
              if (a)
                try {
                  process.chdir(t.options.cwd)
                } catch (t) {}
              let u
              try {
                u = o.sync(t.command, {
                  path: r[s({ env: r })],
                  pathExt: e ? n.delimiter : void 0,
                })
              } catch (t) {
              } finally {
                a && process.chdir(i)
              }
              return u && (u = n.resolve(c ? t.options.cwd : '', u)), u
            }
            t.exports = function (t) {
              return i(t) || i(t, !0)
            }
          },
          749: (t, e, r) => {
            var n
            r(747)
            function o(t, e, r) {
              if (('function' == typeof e && ((r = e), (e = {})), !r)) {
                if ('function' != typeof Promise)
                  throw new TypeError('callback not provided')
                return new Promise(function (r, n) {
                  o(t, e || {}, function (t, e) {
                    t ? n(t) : r(e)
                  })
                })
              }
              n(t, e || {}, function (t, n) {
                t &&
                  ('EACCES' === t.code || (e && e.ignoreErrors)) &&
                  ((t = null), (n = !1)),
                  r(t, n)
              })
            }
            ;(n =
              'win32' === process.platform || global.TESTING_WINDOWS
                ? r(342)
                : r(92)),
              (t.exports = o),
              (o.sync = function (t, e) {
                try {
                  return n.sync(t, e || {})
                } catch (t) {
                  if ((e && e.ignoreErrors) || 'EACCES' === t.code) return !1
                  throw t
                }
              })
          },
          92: (t, e, r) => {
            ;(t.exports = o),
              (o.sync = function (t, e) {
                return s(n.statSync(t), e)
              })
            var n = r(747)
            function o(t, e, r) {
              n.stat(t, function (t, n) {
                r(t, !t && s(n, e))
              })
            }
            function s(t, e) {
              return (
                t.isFile() &&
                (function (t, e) {
                  var r = t.mode,
                    n = t.uid,
                    o = t.gid,
                    s =
                      void 0 !== e.uid
                        ? e.uid
                        : process.getuid && process.getuid(),
                    i =
                      void 0 !== e.gid
                        ? e.gid
                        : process.getgid && process.getgid(),
                    c = parseInt('100', 8),
                    a = parseInt('010', 8),
                    u = parseInt('001', 8),
                    p = c | a
                  return (
                    r & u ||
                    (r & a && o === i) ||
                    (r & c && n === s) ||
                    (r & p && 0 === s)
                  )
                })(t, e)
              )
            }
          },
          342: (t, e, r) => {
            ;(t.exports = s),
              (s.sync = function (t, e) {
                return o(n.statSync(t), t, e)
              })
            var n = r(747)
            function o(t, e, r) {
              return (
                !(!t.isSymbolicLink() && !t.isFile()) &&
                (function (t, e) {
                  var r = void 0 !== e.pathExt ? e.pathExt : process.env.PATHEXT
                  if (!r) return !0
                  if (-1 !== (r = r.split(';')).indexOf('')) return !0
                  for (var n = 0; n < r.length; n++) {
                    var o = r[n].toLowerCase()
                    if (o && t.substr(-o.length).toLowerCase() === o) return !0
                  }
                  return !1
                })(e, r)
              )
            }
            function s(t, e, r) {
              n.stat(t, function (n, s) {
                r(n, !n && o(s, t, e))
              })
            }
          },
          463: (t) => {
            'use strict'
            const e = (t = {}) => {
              const e = t.env || process.env
              return 'win32' !== (t.platform || process.platform)
                ? 'PATH'
                : Object.keys(e)
                    .reverse()
                    .find((t) => 'PATH' === t.toUpperCase()) || 'Path'
            }
            ;(t.exports = e), (t.exports.default = e)
          },
          383: (t, e, r) => {
            'use strict'
            const n = r(557)
            t.exports = (t = '') => {
              const e = t.match(n)
              if (!e) return null
              const [r, o] = e[0].replace(/#! ?/, '').split(' '),
                s = r.split('/').pop()
              return 'env' === s ? o : o ? `${s} ${o}` : s
            }
          },
          557: (t) => {
            'use strict'
            t.exports = /^#!(.*)/
          },
          765: (t, e, r) => {
            const n =
                'win32' === process.platform ||
                'cygwin' === process.env.OSTYPE ||
                'msys' === process.env.OSTYPE,
              o = r(622),
              s = n ? ';' : ':',
              i = r(749),
              c = (t) =>
                Object.assign(new Error('not found: ' + t), { code: 'ENOENT' }),
              a = (t, e) => {
                const r = e.colon || s,
                  o =
                    t.match(/\//) || (n && t.match(/\\/))
                      ? ['']
                      : [
                          ...(n ? [process.cwd()] : []),
                          ...(e.path || process.env.PATH || '').split(r),
                        ],
                  i = n
                    ? e.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
                    : '',
                  c = n ? i.split(r) : ['']
                return (
                  n && -1 !== t.indexOf('.') && '' !== c[0] && c.unshift(''),
                  { pathEnv: o, pathExt: c, pathExtExe: i }
                )
              },
              u = (t, e, r) => {
                'function' == typeof e && ((r = e), (e = {})), e || (e = {})
                const { pathEnv: n, pathExt: s, pathExtExe: u } = a(t, e),
                  p = [],
                  l = (r) =>
                    new Promise((s, i) => {
                      if (r === n.length)
                        return e.all && p.length ? s(p) : i(c(t))
                      const a = n[r],
                        u = /^".*"$/.test(a) ? a.slice(1, -1) : a,
                        l = o.join(u, t),
                        d = !u && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + l : l
                      s(f(d, r, 0))
                    }),
                  f = (t, r, n) =>
                    new Promise((o, c) => {
                      if (n === s.length) return o(l(r + 1))
                      const a = s[n]
                      i(t + a, { pathExt: u }, (s, i) => {
                        if (!s && i) {
                          if (!e.all) return o(t + a)
                          p.push(t + a)
                        }
                        return o(f(t, r, n + 1))
                      })
                    })
                return r ? l(0).then((t) => r(null, t), r) : l(0)
              }
            ;(t.exports = u),
              (u.sync = (t, e) => {
                e = e || {}
                const { pathEnv: r, pathExt: n, pathExtExe: s } = a(t, e),
                  u = []
                for (let c = 0; c < r.length; c++) {
                  const a = r[c],
                    p = /^".*"$/.test(a) ? a.slice(1, -1) : a,
                    l = o.join(p, t),
                    f = !p && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + l : l
                  for (let t = 0; t < n.length; t++) {
                    const r = f + n[t]
                    try {
                      if (i.sync(r, { pathExt: s })) {
                        if (!e.all) return r
                        u.push(r)
                      }
                    } catch (t) {}
                  }
                }
                if (e.all && u.length) return u
                if (e.nothrow) return null
                throw c(t)
              })
          },
          966: (t) => {
            'use strict'
            t.exports = require('@yarnpkg/core')
          },
          688: (t) => {
            'use strict'
            t.exports = require('@yarnpkg/fslib')
          },
          129: (t) => {
            'use strict'
            t.exports = require('child_process')
          },
          42: (t) => {
            'use strict'
            t.exports = require('clipanion')
          },
          747: (t) => {
            'use strict'
            t.exports = require('fs')
          },
          282: (t) => {
            'use strict'
            t.exports = require('module')
          },
          87: (t) => {
            'use strict'
            t.exports = require('os')
          },
          622: (t) => {
            'use strict'
            t.exports = require('path')
          },
        },
        e = {}
      function r(n) {
        if (e[n]) return e[n].exports
        var o = (e[n] = { exports: {} })
        return t[n](o, o.exports, r), o.exports
      }
      return (
        (r.n = (t) => {
          var e = t && t.__esModule ? () => t.default : () => t
          return r.d(e, { a: e }), e
        }),
        (r.d = (t, e) => {
          for (var n in e)
            r.o(e, n) &&
              !r.o(t, n) &&
              Object.defineProperty(t, n, { enumerable: !0, get: e[n] })
        }),
        (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
        (r.r = (t) => {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(t, '__esModule', { value: !0 })
        }),
        r(393)
      )
    })()
    return plugin
  },
}
