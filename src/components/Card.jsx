import React, { useState } from 'react'
import { X, Grid, Star, Move, Copy, Lock, Unlock } from 'react-feather'
import Color from 'color'
import nearestColor from 'nearest-color'
import colorNameList from 'color-name-list'
import { useLocation, useNavigate } from 'react-router-dom'

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

export default function Card({ color, index }) {
    const { pathname } = useLocation()
    const isLight = Color('#' + color).isLight()
    const navigate = useNavigate()

    const [showOptions, setShowOptions] = useState(true)
    let color1 = pathname.replace('/', '').split('-')

    const colors = colorNameList.reduce(
        (o, { name, hex }) => Object.assign(o, { [name]: hex }),
        {}
    )
    const nearest = nearestColor.from(colors)

    const removeColor = () => {
        color1.splice(index, 1)
        // console.log(color1)
        // console.log(index)
        navigate(`/${color1.join('-')}`)
    }

    return (
        <div
            className='p-4 flex-1 relative flex justify-center items-end'
            style={{ backgroundColor: '#' + color }}
            // onMouseEnter={() => {
            //     setShowOptions(true)
            // }}
            // onMouseLeave={() => {
            //     setShowOptions(false)
            // }}
        >
            <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                    showOptions ? 'opacity-100' : 'opacity-0'
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
                    <Lock />
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
                {isLight ? (
                    <p className='text-black/80 font-semibold'>
                        {nearest('#' + color).name}
                    </p>
                ) : (
                    <p className='text-white/80  font-semibold'>
                        {nearest('#' + color).name}
                    </p>
                )}
            </div>
        </div>
    )
}
