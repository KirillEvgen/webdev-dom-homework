import { fetchComments } from './api.js'
import { renderComments } from './renderComments.js'
import { setupAddComment } from './setupAddComment.js'
import { updateComments } from './data.js'
import { getToken } from './api.js'
import { renderLogin } from './login.js'

const container = document.querySelector('.container')

export function renderApp() {
    container.innerHTML = 'Загрузка...'

    fetchComments()
        .then((data) => {
            updateComments(data)
            renderComments(container, rerender)
            if (getToken()) {
                const nameInput = document.querySelector('.add-form-name')
                const textInput = document.querySelector('.add-form-text')
                const button = document.querySelector('.add-form-button')
                setupAddComment(nameInput, textInput, button, rerender)
            }
        })
        .catch(() => {
            container.innerHTML = 'Ошибка загрузки комментариев'
        })
}

const rerender = () => renderApp()

if (!getToken()) {
    renderLogin(container)
} else {
    renderApp()
}
