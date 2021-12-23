import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import CardsView from './components/CardsView'

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path='/'
                    element={<h1>hej</h1>}
                    // element={<Navigate to='/fff-777-000' />}
                />
                <Route path='*' element={<CardsView />} />
            </Routes>
        </Router>
    )
}

export default App
