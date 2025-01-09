
import { Button } from './ui/button';
import React from 'react';

interface ButtonProps{
    isLoading: boolean
    className?: string
    children: React.ReactNode
}

 const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
    return(
        <button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full h-10'}>
            {isLoading ? (
                <div className='flex items-center gap-4'>
                    <img 
                        src='/assets/icons/loader.svg'
                        alt='loader'
                        width={24}
                        height={24}
                        className='animateSpin'
                    />
                    Loading...
                </div>
            ):children}
        </button>
    )
 }

 export default SubmitButton