import ButtonsArea from './components/ButtonsArea';
import ShowResult from './components/ShowResult';

import './scss/app.scss';

function App() {
    return (
        <div className='calculator'>
            <ShowResult />
            <ButtonsArea />
        </div>
    );
}

export default App;
