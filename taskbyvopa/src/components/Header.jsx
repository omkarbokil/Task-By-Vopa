import React from 'react'
import darkMode from '/src/icons/dark_mode.svg'
import lightMode from '/src/icons/light_mode.svg'
import { useState } from 'react'

function Header() {

    let [themeIcon, setThemeIcon] = useState(true)

    let themeSet = () => {
        document.documentElement.classList.toggle('dark')
        setThemeIcon(!themeIcon)
    }

    return (
        <nav className='dark:bg-neutral-800 bg-neutral-300 flex w-full justify-between items-center px-4 py-2 theme-transition fixed top-0 shadow-sm'>
            <p className='text-xl font-semibold tracking-wide text-blue-600'>TenderFlow</p>
            {
                themeIcon ?
                <img src={darkMode} onClick={themeSet} alt="" className='w-9 hover:bg-neutral-700 p-2 rounded-full transition-all duration-300 cursor-pointer' />
                :
                <img src={lightMode} onClick={themeSet} alt="" className=' w-9 hover:bg-neutral-400 p-2 rounded-full transition-all duration-300 cursor-pointer' />
            }
        </nav>
    )
}

export default Header
