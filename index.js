import { setupAddComment } from './events.js'
import { renderComments } from './render.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

setupAddComment(nameInput, textInput, button, commentsList)
renderComments(commentsList, textInput, () => {
  renderComments(commentsList, textInput, () => {}) 
})