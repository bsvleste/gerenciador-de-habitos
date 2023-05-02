import { useEffect, useState } from "react"
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-benning"
import { HabitDay } from "../HabitDay"
import { api } from "../../lib/axios"
import dayjs from "dayjs"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDayesSizes = 18 * 7
const amountOfDaysToFill = minimumSummaryDayesSizes - summaryDates.length
type SummaryProps = {
  id: string
  date: string
  amount: number
  completed: number
}[]
export function SummaryTable() {
  const [summary, setSummary] = useState<SummaryProps>([])
  useEffect(() => {
    api.get('/summary').then(res => {
      setSummary(res.data)
    })
  }, [])
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((weekDay, index) => (
            <div key={`${weekDay}-${index}`} className="text-zinc-400 text-xl w-10 h-10 flex  font-bold items-center justify-center">
              {weekDay}
            </div>
          ))
        }
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {
          summaryDates.map((date) => {
            const dayInsummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })
            return (
              <HabitDay
                date={date}
                key={date.toString()}
                completed={dayInsummary?.completed}
                amount={dayInsummary?.amount} />
            )
          })
        }
        {
          amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <div key={index} className="w-10 h-10 bg-zinc-900  rounded-lg opacity-40 cursor-not-allowed" />
          ))
        }
      </div>
    </div>
  )
}