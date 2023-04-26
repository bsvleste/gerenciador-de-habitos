import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import LogoSVG from '../../assets/logo.svg'
import colors from 'tailwindcss/colors'
export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between">
      <LogoSVG />
      <TouchableOpacity
        className="border border-violet-500 flex-row px-4 h-11 items-center rounded-lg">
        <Feather
          name="plus"
          color={colors.violet[500]}
          size={20}
        />
        <Text className="text-white ml-3 font-semibold text-base">Novo Habito</Text>
      </TouchableOpacity>
    </View>
  )
}