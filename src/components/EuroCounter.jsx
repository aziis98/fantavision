import { useEffect, useState } from 'preact/hooks'
import { db } from '../client/firebase.js'

import { doc, getDoc } from 'firebase/firestore'

export const EuroCounter = ({}) => {
    const [euroVisionDeadline, setEuroVisionDeadline] = useState(null)

    useEffect(async () => {
        const d = await getDoc(doc(db, 'partite', 'eurovision-2024'))
        const data = d.data()

        console.log(data)

        const deadline = new Date(data.scadenza.toDate())
        setEuroVisionDeadline(deadline)
    }, [])

    if (!euroVisionDeadline) {
        return <div class="euro-counter">???</div>
    }

    const currentDate = new Date()

    const daysLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60 * 60 * 24))
    const hoursLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60 * 60)) % 24
    const minutesLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60)) % 60

    return (
        <div class="euro-counter">
            {daysLeft}&nbsp;{daysLeft === 1 ? 'giorno' : 'giorni'}, {hoursLeft}&nbsp;{hoursLeft === 1 ? 'ora' : 'ore'} e {minutesLeft}&nbsp;
            {minutesLeft === 1 ? 'minuto' : 'minuti'}
        </div>
    )
}
