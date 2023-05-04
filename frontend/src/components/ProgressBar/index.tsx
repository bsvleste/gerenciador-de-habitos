import * as Progress from '@radix-ui/react-progress';
import clsx from 'clsx';
interface ProgressBarProps {
  progress: number
}
export function ProgressBar({ progress = 0 }: ProgressBarProps) {

  return (
    <Progress.Root className='h-3 rounded-xl bg-zinc-700 w-full mt-4' value={progress}>
      <Progress.Indicator
        className={clsx('h-3 rounded-xl transition-all ', {
          "bg-transparent": progress === 0,
          "bg-violet-400 border-violet-200": progress > 0 && progress < 20,
          "bg-violet-500 border-violet-400": progress >= 20 && progress < 40,
          "bg-violet-600 border-violet-500": progress >= 40 && progress < 60,
          "bg-violet-700 border-violet-600": progress >= 60 && progress < 80,
          "bg-violet-900 border-violet-700": progress >= 80,
        })}
        style={{
          width: `${progress}%`
        }}
      />
    </Progress.Root>
  )
}