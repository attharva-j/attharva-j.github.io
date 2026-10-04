// Splits a leading figure off an impact statement so it can be set large,
// without changing the words: figure + ' ' + rest === the original string.
//   "60-70% reduction in request-to-implementation cycle time"
//   -> { figure: "60-70%", rest: "reduction in request-to-implementation cycle time" }
const LEADING_FIGURE = /^(\$?\d[\d.,]*(?:-\d[\d.,]*)?[%KkM+]*)\s+(.+)$/

export function splitFigure(statement) {
  const match = statement.match(LEADING_FIGURE)
  return match ? { figure: match[1], rest: match[2] } : { figure: null, rest: statement }
}
