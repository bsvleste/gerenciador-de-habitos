import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ProgressBar } from '../ProgressBar';
import clsx from 'clsx'
import { Check } from '@phosphor-icons/react';
import dayjs from 'dayjs';
interface HabitDayProps {
  completed?: number
  amount?: number
  date: Date
}
export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  const completedPercetange = amount > 0 ? Math.round((completed / amount) * 100) : 0
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10  rounded-lg", {
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
          <div className='mt-6 flex flex-col gap-3'>
            <Checkbox.Root
              className='flex items-center  gap-3 group'
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-[1px] border-zinc-500 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                <Checkbox.Indicator>
                  <Check size={20} />
                </Checkbox.Indicator>
              </div>
              <span className='font-semibold text-white text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>Beber 2L de agua</span>
            </Checkbox.Root>
          </div>
          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

  )
}