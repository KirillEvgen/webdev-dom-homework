import { postComment } from './api.js'
import { commentsData } from './data.js'
import { sanitize } from './sanitize.js'

export function setupAddComment(nameInput, textInput, button, rerender) {
    button.addEventListener('click', () => {
        const name = nameInput.value.trim()
        const text = textInput.value.trim()
        if (!name || !text) return

        const now = new Date().toISOString()
        const key = `${name}_${text}`

        const storedDates = JSON.parse(localStorage.getItem('commentDates') || '{}')
        storedDates[key] = now
        localStorage.setItem('commentDates', JSON.stringify(storedDates))

        postComment(sanitize(name), sanitize(text)).then(() => {
            commentsData.push({
                name: sanitize(name),
                text: sanitize(text),
                created_at: now,
                likes: 0,
                isLiked: false,
            })

            rerender()
            nameInput.value = ''
            textInput.value = ''
        })
    })
}