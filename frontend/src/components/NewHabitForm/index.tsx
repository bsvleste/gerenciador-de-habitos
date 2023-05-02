import { Check } from "@phosphor-icons/react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { useState } from "react";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
const availableWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quitna-Feira',
  'Sexta-Feira',
  'Sabado',
]
export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekdays] = useState<number[]>([])
  async function createNewHabit(event: FormEvent) {
    event.preventDefault()
    if (!title || weekDays.length === 0) {
      return
    }
    await api.post('/habits', {
      title,
      weekDays
    })

    alert("Habito Criado com succeso")
    setTitle('')
    setWeekdays([])
  }
  function handleToggleWeekDays(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRomoveOne = weekDays.filter(day => day === weekDay)
      setWeekdays(weekDaysWithRomoveOne)
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay]
      setWeekdays(weekDaysWithAddOne)
    }
  }
  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight mb-2">
        Qual o seu comprometimento?
      </label>
      <input
        className="p-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400"
        type="text"
        id="title"
        onChange={event => setTitle(event.target.value)}
        placeholder="ex: Exercicios,dormir bem, etc...."
        autoFocus
        value={title}
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência
      </label>
      <div className='mt-3  flex flex-col gap-2 '>
        {
          availableWeekDays.map((weekDay, index) => (
            <Checkbox.Root
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDays(index)}
              key={index}
              className='flex items-center  gap-3 group'
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-[1px] border-zinc-500 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                <Checkbox.Indicator>
                  <Check size={20} />
                </Checkbox.Indicator>
              </div>
              <span className=' text-white leading-tight'>
                {weekDay}
              </span>
            </Checkbox.Root>
          ))
        }
      </div>
      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
        type="submit"
      >
        <Check size={20} weight="bold" />
        confirmar
      </button>
    </form>
  )
}