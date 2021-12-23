import React, { useState } from 'react'
import { X, Grid, Star, Move, Copy, Lock, Unlock, Plus } from 'react-feather'
import Color from 'color'
import nearestColor from 'nearest-color'
import colorNameList from 'color-name-list'
import { useLocation, useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'

function Option({ children, className, isLight, onClick }) {
    const _class =
        'mb-4 last:mb-0 transition-colors cursor-pointer ' +
        (isLight
            ? 'text-gray-900/80 hover:text-black '
            : 'text-gray-200/80 hover:text-white ') +
        className
    return (
        <div className={_class} onClick={() => onClick()}>
            {children}
        </div>
    )
}

export default function Card({ color, index, provider }) {
    color = color.replaceAll('#', '')
    const { pathname } = useLocation()
    const isLight = Color('#' + color.replaceAll('#', '')).isLight()
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    const colors = pathname.replace('/', '').split('-')

    // const colorList = colorNameList.reduce(
    //     (o, { name, hex }) => Object.assign(o, { [name]: hex }),
    //     {}
    // )
    // const nearest = nearestColor.from(colorList)

    const removeColor = () => {
        colors.splice(index, 1)
        navigate(`/${colors.join('-')}`)
    }

    const addColor = () => {
        if (colors.length >= 10) return
        let i = index + 1
        const newColors = chroma
            .scale([colors[index], colors[i] || '#000000'])
            .mode('lch')
            .colors(3)
        console.log('newColor: ', newColors[1])
        colors.splice(i, 0, newColors[1].replaceAll('#', ''))
        navigate(`/${colors.join('-')}`)
    }

    return (
        <div
            className='flex-1'
            onMouseEnter={(e) => {
                setHover(true)
            }}
            onMouseLeave={(e) => {
                setHover(false)
            }}
            // onMouseMove={(e) => {
            //     console.log(e)
            // }}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
        >
            <div
                className='p-4 h-full w-full relative flex justify-center items-end'
                style={{ backgroundColor: '#' + color }}
            >
                {hover && colors.length < 10 && (
                    <div
                        onClick={addColor}
                        className={`absolute rounded-full w-11 h-11 bg-gray-100 shadow-md right-0 top-1/2 -translate-y-1/2 ${
                            index === colors.length - 1
                                ? '-translate-x-1/2'
                                : 'translate-x-1/2'
                        } z-10 flex justify-center items-center`}
                    >
                        <Plus />
                    </div>
                )}
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ${
                        hover ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Option isLight={isLight} onClick={removeColor}>
                        <X />
                    </Option>
                    <Option isLight={isLight}>
                        <Grid />
                    </Option>
                    <Option isLight={isLight}>
                        <Star />
                    </Option>
                    <Option className='cursor-grab' isLight={isLight}>
                        <Move />
                    </Option>
                    <Option isLight={isLight}>
                        <Copy />
                    </Option>
                    <Option isLight={isLight}>
                        <Unlock />
                    </Option>
                </div>
                <div className='text-center'>
                    {isLight ? (
                        <h3 className='text-black text-2xl font-semibold mb-2'>
                            #{color}
                        </h3>
                    ) : (
                        <h3 className='text-white text-2xl font-semibold mb-2'>
                            #{color}
                        </h3>
                    )}
                    {/* {isLight ? (
                        <p className='text-black/80 font-semibold'>
                            {nearest('#' + color).name}
                        </p>
                    ) : (
                        <p className='text-white/80  font-semibold'>
                            {nearest('#' + color).name}
                        </p>
                    )} */}
                </div>
            </div>
        </div>
    )
}
