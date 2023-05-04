import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
type CheckboxProps = TouchableOpacityProps & {
  checked?: boolean
  text: string
}
export function Checkbox({ checked = false, text, ...props }: CheckboxProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-center'
      {...props}
    >

      {
        checked ?
          <Animated.View
            className='h-8 w-8 bg-green-500 rounded-sm items-center justify-center'
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </Animated.View>
          :
          <View className='h-8 w-8 bg-zinc-900 rounded-sm items-center justify-center' />
      }
      <Text className='text-white text-base font-semibold ml-3'>
        {text}
      </Text>
    </TouchableOpacity >
  )
}