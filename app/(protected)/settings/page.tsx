"use client"

import { logout } from '@/actions/logout';
import { useCurrentuser } from '@/hooks/use-current-user';
import React from 'react'

const SettingsPAge =  () => {
    const user = useCurrentuser();
    const onClick = () => {
      logout();
    }
  return (
    <div className='bg-white px-4 py-2 font-semibold rounded-xl'>
        <button onClick={onClick} type='submit'>
            Sign Out
        </button>
    </div>
  )
}

export default SettingsPAge
