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
    const [showColorName, setShowColorName] = useState(false)
    const [hasPressedSpace, setHasPressedSpace] = useState(false)
    const setColors = (data) => {
        colorsRef.current = data
        _setColors(data)
    }

    const getRandom = () => {
        return Math.floor(Math.random() * 255)
    }

    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'KeyN') {
                setShowColorName((c) => !c)
            }
            if (!loading && event.code === 'Space') {
                setLoading(true)
                setHasPressedSpace(true)

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
                setColors(c)
            }
        })

        return () => {
            window.removeEventListener('keydown', (event) => {})
        }
    }, [])

    useEffect(() => {
        setColors(pathname.replace('/', '').split('-'))
    }, [pathname])

    useEffect(() => {
        navigate(`/${colorsRef.current.join('-').replaceAll('#', '')}`)
    }, [colors])

    function handleDragEnd(result) {
        const items = Array.from(colors)
        const [removed] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removed)
        setColors(items)
    }

    return (
        <main>
            {!hasPressedSpace && (
                <div className='absolute top-4 flex justify-center w-screen gap-1'>
                    <div className='rounded-md shadow-md z-30 py-2 px-4 border text-black border-black bg-white animate-bounce'>
                        Press space to generate
                    </div>
                    <div className='rounded-md shadow-md z-30 py-2 px-4 border text-black border-black bg-white animate-bounce'>
                        Press N to toggle color names
                    </div>
                    <div className='rounded-md shadow-md z-30 py-2 px-4 border text-black border-black bg-white animate-bounce'>
                        Drag a color to move it
                    </div>
                </div>
            )}
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
                                    draggableId={color}
                                    index={index}
                                >
                                    {(provider) => (
                                        <Card
                                            color={color}
                                            index={index}
                                            key={color}
                                            showColorName={showColorName}
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
