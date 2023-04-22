const colorValues = require('./ColorVals.json')

const defaultStopwatch = [
    {
    "key": 1,
    "name": "My First Stopwatch",
    "color": colorValues.RedOne,
    "index" : 0,
    "seconds": 0, 
    "minutes": 0, 
    "hours": 0,
    "isRunning": false
  }
]
module.exports = defaultStopwatch