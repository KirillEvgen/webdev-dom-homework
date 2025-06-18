import { postComment } from './api.js'
import { commentsData } from './data.js'
import { sanitize } from './sanitize.js'

export function setupAddComment(nameInput, textInput, button, rerender) {
    button.addEventListener('click', () => {
        const name = nameInput.value.trim()
        const text = textInput.value.trim()

        if (!name || !text) {
            alert('Имя и комментарий не должны быть пустыми')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(sanitize(name), sanitize(text))
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('validation')
                }

                if (response.status >= 500) {
                    throw new Error('server')
                }

                if (!response.ok) {
                    throw new Error('unknown')
                }

                const now = new Date().toISOString()
                const key = `${name}_${text}`

                const storedDates = JSON.parse(
                    localStorage.getItem('commentDates') || '{}',
                )
                storedDates[key] = now
                localStorage.setItem(
                    'commentDates',
                    JSON.stringify(storedDates),
                )

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
            .catch((error) => {
                if (error.message === 'validation') {
                    alert('Имя и комментарий должны быть не короче 3 символов.')
                } else if (error.message === 'server') {
                    alert('Сервер сломался, попробуйте позже.')
                } else if (error.message === 'Failed to fetch') {
                    alert('Кажется, пропал интернет. Попробуйте позже.')
                } else {
                    alert('Произошла ошибка. Попробуйте снова.')
                }

                console.error('Ошибка при отправке комментария:', error)
            })
            .finally(() => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'
            })
    })
}
