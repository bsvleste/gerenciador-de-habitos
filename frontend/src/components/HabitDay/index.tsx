import { ProgressBar } from '../ProgressBar';
import { HabitList } from '../HabitList';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'
import dayjs from 'dayjs';
import { useState } from 'react';
interface HabitDayProps {
  defaultCompleted?: number
  amount?: number
  date: Date
}
export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  const completedPercetange = amount > 0 ? Math.round((completed / amount) * 100) : 0
  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10  rounded-lg transition-colors focus:ring-offset-2 focus:ring-offset-background  focus:outline-none focus:ring-2 focus:ring-violet-600", {
          "bg-zinc-900 border-2 border-zinc-800": completedPercetange === 0,
          "bg-violet-400 border-violet-200": completedPercetange > 0 && completedPercetange < 20,
          "bg-violet-500 border-violet-400": completedPercetange >= 20 && completedPercetange < 40,
          "bg-violet-600 border-violet-500": completedPercetange >= 40 && completedPercetange < 60,
          "bg-violet-700 border-violet-600": completedPercetange >= 60 && completedPercetange < 80,
          "bg-violet-900 border-violet-700": completedPercetange >= 80,
        }
        )} />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
          <ProgressBar progress={completedPercetange} />
          <HabitList date={date} onCompletedChanged={handleCompletedChanged} />
          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

  )
}