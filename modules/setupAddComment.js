import { postComment } from './api.js'
import { commentsData, updateComments } from './data.js'
import { renderComments } from './renderComments.js'
import { sanitize } from './sanitize.js'

export function setupAddComment(nameInput, textInput, button, rerender) {
    button.addEventListener('click', () => {
        const name = nameInput.value.trim()
        const text = textInput.value.trim()
        if (!name || !text) return

        const date = new Date()
            .toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })
            .replace(',', '')

        commentsData.push({
            name: sanitize(name),
            text: sanitize(text),
            date,
            likes: 0,
            isLiked: false,
        })

        postComment(sanitize(name), sanitize(text)).then((data) => {
            updateComments(data)
            renderComments()
            nameInput.value = ''
            textInput.value = ''
        })
    })
}
