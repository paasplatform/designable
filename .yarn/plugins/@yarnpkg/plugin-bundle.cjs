/* eslint-disable */
module.exports = {
  name: '@yarnpkg/plugin-bundle',
  factory: function (require) {
    var plugin
    plugin = (() => {
      'use strict'
      var e = {
          494: (e, t, r) => {
            r.r(t), r.d(t, { default: () => p })
            var n = r(42),
              o = r(966),
              i = r(594),
              c = r(688),
              a = r(76),
              s = function (e, t, r, n) {
                var o,
                  i = arguments.length,
                  c =
                    i < 3
                      ? t
                      : null === n
                      ? (n = Object.getOwnPropertyDescriptor(t, r))
                      : n
                if (
                  'object' == typeof Reflect &&
                  'function' == typeof Reflect.decorate
                )
                  c = Reflect.decorate(e, t, r, n)
                else
                  for (var a = e.length - 1; a >= 0; a--)
                    (o = e[a]) &&
                      (c = (i < 3 ? o(c) : i > 3 ? o(t, r, c) : o(t, r)) || c)
                return i > 3 && c && Object.defineProperty(t, r, c), c
              }
            class l extends n.Command {
              async execute() {
                const e = await o.Configuration.find(
                    this.context.cwd,
                    this.context.plugins
                  ),
                  { project: t, workspace: r } = await o.Project.find(
                    e,
                    this.context.cwd
                  )
                if (!r)
                  throw new i.WorkspaceRequiredError(t.cwd, this.context.cwd)
                const n = c.ppath.resolve(r.cwd, 'package.zip')
                return (
                  await o.StreamReport.start(
                    { configuration: e, stdout: this.context.stdout },
                    async (o) => {
                      var i
                      o.reportJson({ base: r.cwd })
                      const s = await (0, a.getLibzipPromise)(),
                        l = new c.ZipFS(n, { create: !0, libzip: s }),
                        p = new c.JailFS(r.cwd),
                        d = e.get('yarnPath'),
                        u = c.ppath.relative(t.cwd, d)
                      o.reportInfo(null, u),
                        o.reportJson({ location: u }),
                        l.mkdirSync('.yarn'),
                        l.mkdirSync('.yarn/releases')
                      const f = c.xfs.readFileSync(d)
                      l.writeFileSync(u, f)
                      const y = ['lib', 'package.json']
                      for (; y.length > 0; ) {
                        const e = y.shift()
                        if (p.lstatSync(e).isDirectory())
                          l.mkdirSync(e),
                            p.readdirSync(e).forEach((t) => {
                              y.unshift(c.ppath.join(e, t))
                            })
                        else {
                          o.reportInfo(null, e), o.reportJson({ location: e })
                          const t = c.ppath.resolve(r.cwd, e)
                          if ('package.json' === e) {
                            const r = JSON.parse(c.xfs.readFileSync(t, 'utf8'))
                            delete r.devDependencies,
                              delete r.peerDependencies,
                              delete r.bundledDependencies,
                              delete r.jest,
                              Object.keys(r)
                                .filter((e) => e.endsWith('Config'))
                                .forEach((e) => {
                                  delete r[e]
                                }),
                              r.main &&
                                (null === (i = r.scripts) || void 0 === i
                                  ? void 0
                                  : i.start) &&
                                (r.scripts.start = 'node ' + r.main),
                              Object.keys(r.scripts || {}).forEach((e) => {
                                'start' !== e &&
                                  'postinstall' !== e &&
                                  delete r.scripts[e]
                              })
                            const n = JSON.stringify(r, null, '  ')
                            l.writeFileSync(e, n, 'utf8')
                          } else {
                            const r = c.xfs.readFileSync(t)
                            l.writeFileSync(e, r)
                          }
                        }
                      }
                      o.reportInfo(null, '.yarnrc.yml'),
                        o.reportJson({ location: '.yarnrc.yml' }),
                        l.writeFileSync(
                          '.yarnrc.yml',
                          `yarnPath: ${u}\n`,
                          'utf8'
                        ),
                        l.saveAndClose()
                    }
                  )
                ).exitCode()
              }
            }
            s([n.Command.Path('bundle')], l.prototype, 'execute', null)
            const p = { commands: [l] }
          },
          594: (e) => {
            e.exports = require('@yarnpkg/cli')
          },
          966: (e) => {
            e.exports = require('@yarnpkg/core')
          },
          688: (e) => {
            e.exports = require('@yarnpkg/fslib')
          },
          76: (e) => {
            e.exports = require('@yarnpkg/libzip')
          },
          42: (e) => {
            e.exports = require('clipanion')
          },
        },
        t = {}
      function r(n) {
        if (t[n]) return t[n].exports
        var o = (t[n] = { exports: {} })
        return e[n](o, o.exports, r), o.exports
      }
      return (
        (r.n = (e) => {
          var t = e && e.__esModule ? () => e.default : () => e
          return r.d(t, { a: t }), t
        }),
        (r.d = (e, t) => {
          for (var n in t)
            r.o(t, n) &&
              !r.o(e, n) &&
              Object.defineProperty(e, n, { enumerable: !0, get: t[n] })
        }),
        (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (r.r = (e) => {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        r(494)
      )
    })()
    return plugin
  },
}
