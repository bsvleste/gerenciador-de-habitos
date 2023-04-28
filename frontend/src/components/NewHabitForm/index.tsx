import { Check } from "@phosphor-icons/react";

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6" >
      <label htmlFor="title" className="font-semibold leading-tight mb-2">
        Qual o seu comprometimento?
      </label>
      <input
        className="p-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400"
        type="text"
        id="title"
        placeholder="ex: Exercicios,dormir bem, etc...."
        autoFocus
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência
      </label>
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