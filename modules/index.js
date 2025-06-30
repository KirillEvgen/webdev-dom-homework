import { fetchComments } from './api.js'
import { renderComments } from './renderComments.js'
import { setupAddComment } from './setupAddComment.js'
import { updateComments } from './data.js'
import { getToken } from './api.js'
import { renderLogin } from './login.js'

const container = document.querySelector('.container')

export function renderApp() {
    let commentsList = document.querySelector('.comments')

    if (!commentsList) {
        commentsList = document.createElement('ul')
        commentsList.classList.add('comments')
        container.innerHTML = ''
        container.appendChild(commentsList)
    }

    fetchComments()
        .then((data) => {
            if (!getToken()) {
                updateComments(data)
                renderComments(commentsList, null, rerender)
                return
            }

            
            updateComments(data)
            renderComments(commentsList, null, rerender)

            const nameInput = document.querySelector('.add-form-name')
            const textInput = document.querySelector('.add-form-text')
            const button = document.querySelector('.add-form-button')
            setupAddComment(nameInput, textInput, button, rerender)
        })
        .catch((error) => {
            console.error('Ошибка при загрузке:', error)
            container.innerHTML = 'Ошибка загрузки комментариев'
        })
}

const rerender = () => renderApp()

renderApp()
