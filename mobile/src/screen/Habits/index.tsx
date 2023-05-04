import { Alert, Text, View, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native'
import { BackButton } from "../../components/BackButton";
import days from 'dayjs'
import { ProgressBar } from "../../components/ProgressBar";
import { Checkbox } from "../../components/Chekbox";
import { api } from "../../libs/axios";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { generateProgressPercentage } from "../../utils/generate-progress-percentage";
import { HabitsEmpty } from "../../components/HabitsEmpty";
import clsx from "clsx";
interface HabitsParams {
  date: string
}
interface HabitsProps {
  completedHabits: string[]
  possibleHabits: {
    id: string,
    title: string
  }[]
}
export function Habits() {
  const [isLoading, setIsLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<HabitsProps | null>(null)
  const [completedHabits, setcompletedsHabits] = useState<string[]>([])
  const route = useRoute()
  const { date } = route.params as HabitsParams
  const parseDate = days(date)
  const dayOfWeek = parseDate.format("dddd")
  const daysAndMonth = parseDate.format('DD/MM')
  const isDateInPast = parseDate.endOf('day').isBefore(new Date())

  const habitsProgress = dayInfo?.possibleHabits ?
    generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try {
      setIsLoading(true)
      const response = await api.get(`/day`, { params: { date } })
      setDayInfo(response.data)
      setcompletedsHabits(response.data.completedHabits)
    } catch (error) {
      Alert.alert("ops", "Não foi possivel carregar os habitos")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      if (completedHabits.includes(habitId)) {
        setcompletedsHabits(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        setcompletedsHabits(prevState => [...prevState, habitId])
      }
    } catch (error) {
      Alert.alert('ops', "Não foi possivel atualizar o habito tente novamente")
      console.log(error)
    }
  }
  useEffect(() => {
    fetchHabits()
  }, [])
  if (isLoading) {
    return <Loading />
  }
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
        <ProgressBar progress={habitsProgress} />
        <View className={clsx('mt-6', {
          'opacity-50': isDateInPast
        })}>
          {
            dayInfo?.possibleHabits ? dayInfo?.possibleHabits.map((habit, index) => {
              return (
                <Checkbox
                  key={index}
                  disabled={isDateInPast}
                  text={habit.title}
                  checked={completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                />
              )
            }) :
              <HabitsEmpty />
          }
          {
            isDateInPast && (
              <Text className="text-white mt-10 text-center">
                Voçê não pode editar um habito passado
              </Text>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}