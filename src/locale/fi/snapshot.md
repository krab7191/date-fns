# Finnish (fi) locale

## `format` and `parse`

| Title | Token string | Dates | `format` result | `parse` result |
|-------|--------------|-------|-------------------|------------------|
| Era | G | 1987-02-11T12:00:00 | jaa. | Invalid Date |
| | | 2501-02-01T12:00:00 | eaa. | Invalid Date |
| | GG | 1987-02-11T12:00:00 | jaa. | Invalid Date |
| | | 2501-02-01T12:00:00 | eaa. | Invalid Date |
| | GGG | 1987-02-11T12:00:00 | jaa. | Invalid Date |
| | | 2501-02-01T12:00:00 | eaa. | Invalid Date |
| | GGGG | 1987-02-11T12:00:00 | jälkeen ajanlaskun alun | Invalid Date |
| | | 2501-02-01T12:00:00 | ennen ajanlaskun alkua | Invalid Date |
| | GGGGG | 1987-02-11T12:00:00 | jaa. | Invalid Date |
| | | 2501-02-01T12:00:00 | eaa. | Invalid Date |
| Calendar year | y | 1987-02-11T12:00:00 | 1987 | 1987-01-01T12:00:00 |
| | | 0005-04-19T01:07:00 | 5 | 0005-01-01T12:00:00 |
| | yo | 1987-02-11T12:00:00 | 1987. | Invalid Date |
| | | 0005-04-19T01:07:00 | 5. | Invalid Date |
| | yy | 1987-02-11T12:00:00 | 87 | 1987-01-01T12:00:00 |
| | | 0005-04-19T01:07:00 | 05 | 0005-01-01T12:00:00 |
| | yyy | 1987-02-11T12:00:00 | 1987 | Invalid Date |
| | | 0005-04-19T01:07:00 | 005 | 0005-01-01T12:00:00 |
| | yyyy | 1987-02-11T12:00:00 | 1987 | 1987-01-01T12:00:00 |
| | | 0005-04-19T01:07:00 | 0005 | 0005-01-01T12:00:00 |
| | yyyyy | 1987-02-11T12:00:00 | 01987 | 1987-01-01T12:00:00 |
| | | 0005-04-19T01:07:00 | 00005 | 0005-01-01T12:00:00 |

## `formatDistance`

## `formatDistanceStrict`

## `formatRelative`
