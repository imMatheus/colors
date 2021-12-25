import React, { useEffect, useState } from 'react'
import { X, Move, Plus } from 'react-feather'
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

export default function Card({ color, index, provider, showColorName }) {
    color = color.replaceAll('#', '')
    const { pathname } = useLocation()
    const [colorName, setColorName] = useState(null)
    const isLight = Color('#' + color.replaceAll('#', '')).isLight()
    const navigate = useNavigate()
    const colors = pathname.replace('/', '').split('-') //TODO fixa det här

    useEffect(() => {
        if (showColorName) {
            const colorList = colorNameList.reduce(
                (o, { name, hex }) => Object.assign(o, { [name]: hex }),
                {}
            )
            const nearest = nearestColor.from(colorList)
            setColorName(nearest('#' + color).name)
        } else {
            setColorName(null)
        }
    }, [color, showColorName])

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
        colors.splice(i, 0, newColors[1].replaceAll('#', ''))
        navigate(`/${colors.join('-')}`)
    }

    return (
        <div
            className='flex-1'
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
        >
            <div
                className='p-4 h-full w-full relative flex justify-center items-end bg-slate-50'
                style={{ backgroundColor: '#' + color }}
            >
                {colors.length < 10 && (
                    <>
                        {index === 0 && (
                            <div className='group absolute left-0 w-1/3 z-30 top-0 bottom-0 flex justify-center items-center '>
                                <div
                                    onClick={() => {
                                        const newColors = chroma
                                            .scale(['#ffffff', colors[index]])
                                            .mode('lch')
                                            .colors(3)

                                        colors.unshift(
                                            newColors[1].replaceAll('#', '')
                                        )
                                        navigate(`/${colors.join('-')}`)
                                    }}
                                    className='hidden group-hover:flex rounded-full w-11 h-11 bg-gray-100 shadow-md z-10 justify-center items-center'
                                >
                                    <Plus />
                                </div>
                            </div>
                        )}

                        <div
                            className={`group absolute right-0 w-1/3 z-30 top-0 bottom-0 flex justify-center items-center ${
                                index === colors.length - 1
                                    ? '-translate-x-1/5'
                                    : 'translate-x-1/2'
                            }`}
                        >
                            <div
                                onClick={addColor}
                                className='hidden group-hover:flex rounded-full w-11 h-11 bg-gray-100 shadow-md z-10 justify-center items-center'
                            >
                                <Plus />
                            </div>
                        </div>
                    </>
                )}
                <div className='absolute inset-0 group'>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block'>
                        <Option isLight={isLight} onClick={removeColor}>
                            <X />
                        </Option>
                        <Option className='cursor-grab' isLight={isLight}>
                            <Move />
                        </Option>
                    </div>
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

                    {showColorName &&
                        (isLight ? (
                            <p className='text-black/80 font-semibold'>
                                {colorName || '...'}
                            </p>
                        ) : (
                            <p className='text-white/80  font-semibold'>
                                {colorName || '...'}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    )
}
