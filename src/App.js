import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WeatherContainer } from './components/WeatherContainer'
import '../src/index.css'

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherContainer />
      <Footer />
    </div>
  )
}

export default App
