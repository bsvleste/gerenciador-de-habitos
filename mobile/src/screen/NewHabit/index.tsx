import { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { Checkbox } from '../../components/Chekbox'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from '../../libs/axios'
const availableWeekDays = ['Domingo', 'Segunda-feria', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado']
export function NewHabit() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])
  function handleToggleWeekDay(weekDaysIndex: number) {
    if (weekDays.includes(weekDaysIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay != weekDaysIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDaysIndex])
    }
  }
  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert("Novo Habito", "Informe o titulo do habito e escolha o periodo")
      }
      await api.post('/habits', { title, weekDays })
      setTitle('')
      setWeekDays([])
      Alert.alert("Novo Habito", "Habito criado com sucesso")
    } catch (error) {
      Alert.alert("ops!", "Erro ao cadastrar novo habito tente novamente")
      console.log(error)
    }
  }
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 46
        }}
      >
        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar habito
        </Text>
        <Text className='mt-6 text-white font-semibold text-base'>
          Qual o seu compromentimento?
        </Text>
        <TextInput
          placeholder='ex: Passear com o Dog, Correr, etc...'
          placeholderTextColor={colors.zinc[400]}
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white border-2 border-zinc-700 focus:border-2 focus:border-green-600'
          onChangeText={setTitle}
          value={title}
        />
        <Text className='font-semibold mt-4 mb-3 text-white text-base'>Qual a recorrencia</Text>
        {
          availableWeekDays.map((days, index) => (
            <Checkbox
              checked={weekDays.includes(index)}
              key={index}
              text={days}
              onPress={() => handleToggleWeekDay(index)} />
          ))
        }
        <TouchableOpacity
          onPress={handleCreateNewHabit}
          className='w-full items-center mt-6 justify-center flex-row h-14 bg-green-600 rounded-lg'
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className='text-semibold text-base text-white ml-2'>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}