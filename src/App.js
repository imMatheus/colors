import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import CardsView from './components/CardsView'

function App() {
    console.log('Made by 3m@nu31, $1m0n and M@7h3u$')
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Navigate to='/fff-000' />} />
                <Route path='*' element={<CardsView />} />
            </Routes>
        </Router>
    )
}

export default App
