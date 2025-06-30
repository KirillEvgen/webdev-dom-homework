export const commentsData = []

export const updateComments = (newComments) => {
    const storedDates = JSON.parse(localStorage.getItem('commentDates') || '{}')
    let updated = false

    const previousMap = new Map()
    commentsData.forEach((comment) => {
        const key = `${comment.name}_${comment.text}_${comment.created_at}`
        previousMap.set(key, comment)
    })

    commentsData.length = 0

    newComments.forEach((comment) => {
        const key = `${comment.name}_${comment.text}_${comment.created_at}`

        if (!storedDates[key]) {
            storedDates[key] = comment.created_at
            updated = true
        }

        const previous = previousMap.get(key)

        commentsData.push({
            ...comment,
            created_at: storedDates[key],
            isLiked: previous?.isLiked || false,
            likes: previous?.likes ?? comment.likes,
        })
    })

    if (updated) {
        localStorage.setItem('commentDates', JSON.stringify(storedDates))
    }
}
