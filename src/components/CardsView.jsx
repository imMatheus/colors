import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useLocation, useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'
import Color from 'color'
import { useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function CardsView() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [colors, _setColors] = useState(pathname.replace('/', '').split('-'))
    const colorsRef = useRef(colors)
    const renders = useRef(0)
    console.log('renders:', ++renders.current)
    const setColors = (data) => {
        colorsRef.current = data
        _setColors(data)
    }

    const getRandom = () => {
        return Math.floor(Math.random() * 255)
    }

    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (!loading && event.code === 'Space') {
                setLoading(true)

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
                    .colors(colorsRef.current.length)
                console.log(c)
                setColors(c)
            }
        })

        return () => {
            window.removeEventListener('keydown', (event) => {
                console.log('A key wasssss pressed', event)
            })
        }
    }, [])

    useEffect(() => {
        setColors(pathname.replace('/', '').split('-'))
    }, [pathname])

    useEffect(() => {
        navigate(`/${colorsRef.current.join('-').replaceAll('#', '')}`)
    }, [colors])

    function handleDragEnd(result) {
        console.log(result)
        const items = Array.from(colors)
        const [removed] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removed)
        setColors(items)
    }

    return (
        <main>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='colors' direction='horizontal'>
                    {(provider) => (
                        <div
                            className='flex h-screen w-screen'
                            {...provider.droppableProps}
                            ref={provider.innerRef}
                        >
                            {colors.map((color, index) => (
                                <Draggable
                                    key={color}
                                    draggableId={index.toString()}
                                    index={index}
                                >
                                    {(provider) => (
                                        <Card
                                            color={color}
                                            index={index}
                                            provider={provider}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    )
}
