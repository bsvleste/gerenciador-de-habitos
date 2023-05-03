import { View } from "react-native"
import clsx from 'clsx'
interface ProgressbarProps {
  progress?: number
}
export function ProgressBar({ progress = 0 }: ProgressbarProps) {
  console.log(progress)
  return (
    <View
      className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View
        className={clsx('h-3 rounded-xl', {
          ["bg-zinc-900  "]: progress === 0,
          ["bg-violet-400"]: progress > 0 && progress < 20,
          ["bg-violet-500"]: progress >= 20 && progress < 40,
          ["bg-violet-600"]: progress >= 40 && progress < 60,
          ["bg-violet-700"]: progress >= 60 && progress < 80,
          ["bg-violet-900"]: progress >= 80,
        })}
        style={{ width: `${progress}%` }}
      />
    </View>
  )
}