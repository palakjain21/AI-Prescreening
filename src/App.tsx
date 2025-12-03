import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header, ScreeningQuestions, Sidebar } from './components'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Sidebar />
          <Header />
          <div  className="min-h-screen"><ScreeningQuestions />
          </div>
          
      </div>
    </DndProvider>
  );
}

export default App;
