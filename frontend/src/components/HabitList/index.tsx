/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import dayjs from 'dayjs';
interface HabiListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}
interface HabitsInfoProps {
  possibleHabits: Array<{
    id: string,
    title: string,
    created_at: string
  }>
  completedHabits: string[]
}
export function HabitList({ date, onCompletedChanged }: HabiListProps) {
  const [habistInfo, setHabitsInfo] = useState<HabitsInfoProps>()
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())
  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  }, [])
  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)
    const isHabitAlreadyCompleted = habistInfo!.completedHabits.includes(habitId)
    let completedHabits: string[] = []
    if (isHabitAlreadyCompleted) {
      completedHabits = habistInfo!.completedHabits.filter(id => id !== habitId)

    } else {
      completedHabits = [...habistInfo!.completedHabits, habitId]
    }
    setHabitsInfo({
      possibleHabits: habistInfo!.possibleHabits,
      completedHabits
    })
    onCompletedChanged(completedHabits.length)
  }
  return (
    <div className='mt-6 flex flex-col gap-3'>
      {
        habistInfo?.possibleHabits.map((habit) => (
          <Checkbox.Root
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habistInfo.completedHabits.includes(habit.id)}
            key={habit.id}
            disabled={isDateInPast}
            className='flex items-center  gap-3 group focus:outline-none disabled:cursor-not-allowed'>

            <div className='transition-colors h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-[1px] border-zinc-500 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-offset-2 group-focus:ring-offset-background group-focus:ring-2 group-focus:ring-violet-600'>
              <Checkbox.Indicator>
                <Check size={20} />
              </Checkbox.Indicator>
            </div>
            <span className='font-semibold text-white text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {habit.title}
            </span>
          </Checkbox.Root>

        ))
      }
    </div>
  )
}