#!/usr/bin/env babel-node

/**
 * @file
 * The script generates the locale snapshots.
 *
 * It's a part of the build process.
 */

import { readFileSync, writeFile } from 'mz/fs'
import path from 'path'
import format from '../../src/format'
import isValid from '../../src/isValid'
import parse from '../../src/parse'
import listLocales from '../_lib/listLocales'

const outdatedLocales = JSON.parse(
  readFileSync(path.join(process.cwd(), 'outdatedLocales.json'), 'utf8')
)
const locales = listLocales().filter(
  ({ code }) => !outdatedLocales.includes(code)
)
const formatParseTokens = [
  {
    title: 'Era',
    tokens: ['G', 'GG', 'GGG', 'GGGG', 'GGGGG'],
    dates: [new Date(1987, 1, 11, 12), new Date(-2500, 1, 1, 12)]
  },
  {
    title: 'Calendar year',
    tokens: ['y', 'yo', 'yy', 'yyy', 'yyyy', 'yyyyy'],
    dates: [new Date(1987, 1, 11, 12), -62000000000000]
  }
]
const isoString = "yyyy-MM-dd'T'hh:mm:ss"

const snapshots = locales.map(localeObj => {
  const { code, fullPath } = localeObj
  const locale = require(`../../src/locale/${code}`)
  const source = readFileSync(path.join(process.cwd(), fullPath)).toString()
  const languageName = source.match(/\* @language (.*)/)[1]

  const snapshot = `# ${languageName} (${code}) locale

## \`format\` and \`parse\`

${renderFormatParse(locale)}

## \`formatDistance\`

## \`formatDistanceStrict\`

## \`formatRelative\`
`

  const snapshotPath = path.join(
    path.resolve(process.cwd(), path.dirname(fullPath)),
    'snapshot.md'
  )
  return { snapshot, snapshotPath }
})

Promise.all(
  snapshots.map(({ snapshot, snapshotPath }) =>
    writeFile(snapshotPath, snapshot)
  )
).catch(err => {
  console.error(err.stack)
  process.exit(1)
})

function renderFormatParse(locale) {
  return `| Title | Token string | Dates | \`format\` result | \`parse\` result |
|-------|--------------|-------|-------------------|------------------|
${formatParseTokens
  .map(({ title, tokens, dates }) => {
    // const datesColumn = dates.map(date => format(date, isoString))
    // const formatColumn = dates.map(date => format(date, string, { locale }))
    // const parseColumn = formatColumn.map((formatString, index) => {
    //   const parsedDate = parse(formatString, string, dates[index], { locale })
    //   if (isValid(parsedDate)) {
    //     return format(parsedDate, isoString)
    //   } else {
    //     return 'Invalid Date'
    //   }
    // })

    return tokens
      .map((token, tokenIndex) => {
        return dates
          .map((date, dateIndex) => {
            const dateString = format(date, isoString)
            const formatResult = format(date, token, { locale })
            const parsedDate = parse(formatResult, token, date, { locale })
            const parseResult = isValid(parsedDate)
              ? format(parsedDate, isoString)
              : 'Invalid Date'

            if (dateIndex === 0 && tokenIndex === 0) {
              return `| ${title} | ${token} | ${dateString} | ${formatResult} | ${parseResult} |`
            } else if (dateIndex === 0) {
              return `| | ${token} | ${dateString} | ${formatResult} | ${parseResult} |`
            } else {
              return `| | | ${dateString} | ${formatResult} | ${parseResult} |`
            }
          })
          .join('\n')
      })
      .join('\n')
  })
  .join('\n')}`
}
