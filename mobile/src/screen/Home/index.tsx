import { Text, View, ScrollView, Alert } from 'react-native'
import { Header } from '../../components/Header'
import { HabitDays, DAY_SIZE } from '../../components/HabitDays'
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-benning'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { api } from '../../libs/axios'
import dayjs from 'dayjs'
import { Loading } from '../../components/Loading'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearsStart = generateDatesFromYearBeginning()
const minimumSummaryDayesSizes = 18 * 7
const amountOfDaysToFill = minimumSummaryDayesSizes - datesFromYearsStart.length

type SummaryProps = {
  id: string
  date: string
  amount: number
  completed: number
}[]
export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>([])
  const { navigate } = useNavigation()
  function handleNavigateToHabit(date: string) {
    navigate('habit', { date })
  }
  async function fecthData() {
    try {
      const response = await api.get('/summary')
      setSummary(response.data)

    } catch (error) {
      Alert.alert("Ops!!", "Não foi possivel carregar os dados")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fecthData()
  }, [])

  if (loading) {
    return (<Loading />)
  }
  return (
    <View className="bg-background flex-1 px-8 pt-16 ">
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, index) => (
          <Text
            style={{ width: DAY_SIZE }}
            key={`${weekDay}-${index}`}
            className='text-zinc-300 text-xl text-center mx-1 font-bold'
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {
          summary &&
          <View className='flex-row flex-wrap'>
            {
              datesFromYearsStart.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                return (
                  <HabitDays
                    amountCompleted={dayWithHabits?.completed}
                    amountOfHabits={dayWithHabits?.amount}
                    date={date}
                    key={date.toISOString()}
                    onPress={() => handleNavigateToHabit(date.toISOString())} />
                )
              })
            }
            {
              amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className='opacity-40 bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
                  style={{
                    width: DAY_SIZE,
                    height: DAY_SIZE
                  }}
                />
              ))
            }
          </View>
        }

      </ScrollView>
    </View>
  )
}