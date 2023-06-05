/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { readFile, writeFile, existsSync } from 'fs-extra'
import glob from 'glob'

const replaceContent = async ({ filename }: any) => {
  if (!existsSync(filename)) {
    return Promise.resolve()
  }

  try {
    const fileContent: string = (await readFile(filename)).toString()
    if (fileContent.indexOf('./styles.less') > 1) {
      console.log(`删除style less引入:${filename}`)
    }
    if (fileContent.indexOf('./theme.less') > 1) {
      console.log(`删除theme less引入${filename}`)
    }
    return writeFile(
      filename,
      fileContent
        .replace("import './styles.less'", "//import './styles.less")
        .replace("import './theme.less'", "//import './theme.less")
        .replace('require("./styles.less")', '//require("./styles.less")')
        .replace('require("./theme.less")', '//require("./theme.less")')
    )
  } catch (ex) {
    console.log(`file: ${filename}, ex: ${ex.toString()}`)
    return Promise.resolve()
  }
}

export const runRemoveLess = (dir: 'esm' | 'es' | 'lib') => {
  return new Promise((resolve, reject) => {
    glob(`./${dir}/**/*`, (err, files) => {
      if (err) {
        return reject(err)
      }
      for (let i = 0; i < files.length; i += 1) {
        const filename = files[i]
        if (/\/*.[t|j]sx?$/.test(filename)) {
          replaceContent({
            filename,
          })

          continue
        }
      }
    })
  })
}
