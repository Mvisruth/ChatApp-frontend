import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/register' element={<Homepage register/>}/>

        <Route path='/chat' element={<Chatpage/>}/>
      </Routes>
    </div>
  );
}

export default App;


