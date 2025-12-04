import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header, ScreeningQuestions, Sidebar } from './components'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
        <Sidebar />
          <Header/>
          <div  className="min-h-screen"><ScreeningQuestions />
          </div>
    </DndProvider>
  );
}

export default App;
