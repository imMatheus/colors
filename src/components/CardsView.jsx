import React, { useEffect } from 'react'
import Card from './Card'
import { useLocation, useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'
import Color from 'color'

export default function CardsView() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const colors = pathname.replace('/', '').split('-')
    console.log(colors)

    const getRandom = () => {
        return Math.floor(Math.random() * 255)
    }

    useEffect(() => {
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space') {
                console.log('Space pressed')
                const c = chroma
                    .scale([
                        Color({
                            r: getRandom(),
                            g: getRandom(),
                            b: getRandom(),
                        }).hex(),
                        Color({
                            r: getRandom(),
                            g: getRandom(),
                            b: getRandom(),
                        }).hex(),
                    ])
                    .mode('lch')
                    .colors(6)
                navigate(`/${c.join('-').replaceAll('#', '')}`)
            }
        })
    }, [navigate])

    return (
        <div className='flex h-screen w-screen bg-red-300'>
            {colors.map((color, index) => (
                <Card color={color} index={index} key={index} />
            ))}
        </div>
    )
}
