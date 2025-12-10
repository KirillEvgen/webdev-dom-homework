import { postComment, fetchComments } from './api.js'
import { updateComments } from './data.js'
import { sanitize } from './sanitize.js'
import { renderComments } from './renderComments.js'

export function setupAddComment(nameInput, textInput, button, rerender) {
    button.addEventListener('click', () => {
        const name = nameInput.value.trim()
        const text = textInput.value.trim()

        if (!name || !text) {
            alert('Имя и комментарий не должны быть пустыми')
            return
        }

        const formLoading = document.querySelector('.form-loading')
        const addForm = document.querySelector('.add-form')
        if (!formLoading || !addForm) return

        formLoading.style.display = 'block'
        addForm.style.display = 'none'

        postComment(sanitize(name), sanitize(text))
            .then((response) => {
                if (response.status === 400) throw new Error('validation')
                if (response.status >= 500) throw new Error('server')
                if (!response.ok) throw new Error('unknown')

                return fetchComments()
            })
            .then((data) => {
                updateComments(data)

                const commentsList = document.querySelector('.comments')
                renderComments(commentsList, null, rerender)

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
                formLoading.style.display = 'none'
                addForm.style.display = 'flex'
            })
    })
}
