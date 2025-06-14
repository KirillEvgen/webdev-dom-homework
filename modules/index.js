import { fetchComments } from './api.js'
import { renderComments } from './renderComments.js'
import { setupAddComment } from './setupAddComment.js'
import { updateComments } from './data.js'

fetchComments().then(data => {
    updateComments(data) 
    rerender() 
})

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

const rerender = () => renderComments(commentsList, textInput, rerender)

setupAddComment(nameInput, textInput, button, rerender)
rerender()