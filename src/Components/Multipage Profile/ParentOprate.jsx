import React, { useState } from 'react'
import MyProfile from '../MyProfile'
import Parent from './Parent'

const ParentOprate = () => {
    const [parenttab, setparenttab] = useState(1)
    return (
        <>
            {parenttab === 1 && <MyProfile setparenttab={setparenttab} />}
            {parenttab === 2 && <Parent setparenttab={setparenttab} />}
        </>
    )
}

export default ParentOprate
