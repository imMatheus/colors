import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CardsView from './components/CardsView'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<h1>hej</h1>} />
                <Route path='/*' element={<CardsView />} />
            </Routes>
        </>
    )
}

export default App
