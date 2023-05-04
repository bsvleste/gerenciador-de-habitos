import { View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import clsx from 'clsx'
import { useEffect } from "react"
interface ProgressbarProps {
  progress?: number
}
export function ProgressBar({ progress = 0 }: ProgressbarProps) {
  const sharedProgress = useSharedValue(progress)
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })
  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }
    , [progress])
  return (
    <View
      className="w-full h-3 rounded-xl bg-zinc-700 mt-4 transition-all">
      <Animated.View
        className={clsx('h-3 rounded-xl', {
          ["bg-zinc-900  "]: progress === 0,
          ["bg-violet-400"]: progress > 0 && progress < 20,
          ["bg-violet-500"]: progress >= 20 && progress < 40,
          ["bg-violet-600"]: progress >= 40 && progress < 60,
          ["bg-violet-700"]: progress >= 60 && progress < 80,
          ["bg-violet-900"]: progress >= 80,
        })}
        style={style}
      />
    </View>
  )
}