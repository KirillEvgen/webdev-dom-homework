import { fetchComments } from './api.js'
import { renderComments } from './renderComments.js'
import { setupAddComment } from './setupAddComment.js'
import { updateComments } from './data.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

const rerender = () => renderComments(commentsList, textInput, rerender)

commentsList.innerHTML = 'Подождите, комментарии загружаются...'

fetchComments()
    .then((data) => {
        updateComments(data)
        rerender()
    })
    .catch((error) => {
        commentsList.innerHTML = 'Ошибка загрузки комментариев. Попробуйте позже.'
        console.error('Ошибка при загрузке комментариев:', error)
    })

setupAddComment(nameInput, textInput, button, rerender)

