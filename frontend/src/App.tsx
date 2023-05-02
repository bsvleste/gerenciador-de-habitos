import { Container } from './components/Container'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import './styles/global.css'
import './lib/dayjs'
export function App() {
  return (
    <Container>
      <Header />
      <SummaryTable />
    </Container>
  )
}


