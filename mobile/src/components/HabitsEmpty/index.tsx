import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export function HabitsEmpty() {
  const { navigate } = useNavigation()
  return (
    <View className='flex-1 flex items-center justify-center'>
      <FontAwesome name="gears" size={24} color="white" />
      <Text className='text-zinc-400 text-base'>
        Voçê não tem hábitos neste dia
      </Text>
      <Text className='text-violet-500 text-base underline active:text-violet-600'
        onPress={() => navigate('newHabits')}
      >
        Criar um novo Habito
      </Text>
    </View>
  )
}