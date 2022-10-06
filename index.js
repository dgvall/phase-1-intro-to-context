// Your code here
let records = []

function createEmployeeRecord (array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(array) {
  return array.map((empArray) => createEmployeeRecord(empArray))
}

function createTimeInEvent(empObj, dateStamp) {
    empObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0],
  })
  return empObj
}

function createTimeOutEvent(empObj, dateStamp) {
  empObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0],
  })
  return empObj
}

function hoursWorkedOnDate (empObj, dateWorked) {
  let timeIn = empObj.timeInEvents.find((obj) => obj.date === dateWorked)
  let timeOut = empObj.timeOutEvents.find((obj) => obj.date === dateWorked)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(empObj, dateWorked) {
  let hours = hoursWorkedOnDate(empObj, dateWorked)
  let rate = empObj.payPerHour
  return hours * rate
}

function allWagesFor(empObj) {
  let datesWorked = empObj.timeInEvents.map((obj) => obj.date)
  let amountOwed = datesWorked.map((date) => wagesEarnedOnDate(empObj, date)).reduce((num, total) => num + total)

  return amountOwed
}

function calculatePayroll (array) {
  let payArray = array.map((empObj) => allWagesFor(empObj))

  return payArray.reduce((num, total) => num + total)
}

