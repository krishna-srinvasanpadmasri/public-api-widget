import './App.css';
import NeoPage from './components/neoPage';
import {Routes,Route} from 'react-router-dom';
import ChatWidget from './components/chatWidget';
import Reports from './components/reports';
import SolutionArticle from './components/solutionArticle';
function App() {
  
  return (<>
    <div className="App">
    <Routes>
            <Route path = '/' element = {<NeoPage/>}/>
            <Route path = '/solution-articles' element= {<SolutionArticle/>}/>
            <Route path = '/chat-widget' element={<ChatWidget/>}/>
            <Route path = '/reports' element={<Reports/>}/>
    </Routes> 
    </div>
    </>
  );
}

export default App;
