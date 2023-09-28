import React from "react";

// Generating current date for header
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const currentDate = new Date()
const dayIndex = currentDate.getDay()
const day = dayNames[dayIndex]
const monthIndex = currentDate.getMonth()
const month = months[monthIndex]
const date = currentDate.getDate()
console.log(day, month, date)

const Nav = () => {
  return(
    <>
      <header>
        <nav className="py-5 px-4 rounded-t-lg">
          <h1 className="text-xl">Todo App</h1>
          <h1 className="text-xs"><span>{date}</span> <span>{month}</span>, <span>{day}</span></h1>
        </nav>
      </header>
    </>
  )
}

export default Nav