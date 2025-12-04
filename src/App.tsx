import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header, ScreeningQuestions, Sidebar } from './components'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-[78px]">
          <Header />
          <div className="min-h-screen">
            <ScreeningQuestions />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
