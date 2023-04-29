import { Text, View, ScrollView } from 'react-native'

import { Header } from '../../components/Header'
import { HabitDays, DAY_SIZE } from '../../components/HabitDays'
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-benning'
import { useNavigation } from '@react-navigation/native'
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearsStart = generateDatesFromYearBeginning()
const minimumSummaryDayesSizes = 18 * 7
const amountOfDaysToFill = minimumSummaryDayesSizes - datesFromYearsStart.length

export function Home() {
  const { navigate } = useNavigation()
  function handleNavigateToHabit(date: string) {
    navigate('habit', { date })
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

        <View className='flex-row flex-wrap'>
          {
            datesFromYearsStart.map(date => (
              <HabitDays
                key={date.toISOString()}
                onPress={() => handleNavigateToHabit(date.toISOString())} />
            ))
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

      </ScrollView>
    </View>
  )
}