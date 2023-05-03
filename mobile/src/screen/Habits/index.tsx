import { Text, View, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native'
import { BackButton } from "../../components/BackButton";
import days from 'dayjs'
import { ProgressBar } from "../../components/ProgressBar";
import { Checkbox } from "../../components/Chekbox";
interface HabitsProps {
  date: string
}
export function Habits() {
  const route = useRoute()
  const { date } = route.params as HabitsProps
  const parseDate = days(date)
  const dayOfWeek = parseDate.format("dddd")
  const daysAndMonth = parseDate.format('DD/MM')
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 46
        }}
      >
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">{dayOfWeek}</Text>
        <Text className="text-white font-extrabold text-3xl">{daysAndMonth}</Text>
        <ProgressBar progress={30} />
        <View className="mt-6">
          <Checkbox text="Correr" checked />
          <Checkbox text="Passear Com o Dog" />
        </View>
      </ScrollView>
    </View>
  )
}