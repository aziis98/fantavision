export const EuroCounter = ({}) => {
    // compute days and hours left to the 7th of May 2024

    const euroVisionStartDate = new Date(2024, 4, 7)
    const currentDate = new Date()

    const daysLeft = Math.floor((euroVisionStartDate - currentDate) / (1000 * 60 * 60 * 24))
    const hoursLeft = Math.floor((euroVisionStartDate - currentDate) / (1000 * 60 * 60)) % 24

    return (
        <div class="euro-counter">
            {daysLeft}&nbsp;{daysLeft === 1 ? 'giorno' : 'giorni'} e {hoursLeft}&nbsp;{hoursLeft === 1 ? 'ora' : 'ore'}
        </div>
    )
}
