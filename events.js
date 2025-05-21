import { commentsData } from './data.js'
import { sanitizeName, sanitizeText } from './sanitize.js'
import { renderComments } from './render.js'

export function setupAddComment(nameInput, textInput, button, commentsList) {
  button.addEventListener('click', () => {
    if (!nameInput.value.trim() || !textInput.value.trim()) return

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
      name: sanitizeName(nameInput.value),
      date: date,
      text: sanitizeText(textInput.value),
      likes: 0,
      isLiked: false,
    })

    nameInput.value = ''
    textInput.value = ''

    renderComments(commentsList, textInput)
  })
} 