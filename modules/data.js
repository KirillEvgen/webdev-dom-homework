export const commentsData = []

export const updateComments = (newComments) => {
    commentsData.length = 0

    const storedDates = JSON.parse(localStorage.getItem('commentDates') || '{}')
    let updated = false

    newComments.forEach((comment) => {
        const key = `${comment.name}_${comment.text}`

        
        if (!storedDates[key]) {
            storedDates[key] = new Date().toISOString()
            updated = true
        }

        commentsData.push({
            ...comment,
            created_at: storedDates[key],
        })
    })

    if (updated) {
        localStorage.setItem('commentDates', JSON.stringify(storedDates))
    }
}