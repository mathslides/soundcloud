import React from 'react'

const Container = ({ children }) => {
    return (
        <div className='gap-y-8 grid ml-60 p-8'>
            {children}
        </div>
    )
}

export default Container
