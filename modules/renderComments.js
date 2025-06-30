import { commentsData } from './data.js'
import { getToken, getUserName } from './api.js'

export function renderComments(commentsList, textInput, rerender) {
    commentsList.innerHTML = ''

    commentsData.forEach((comment, index) => {
        const formattedDate = new Date(comment.created_at)
            .toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })
            .replace(',', '')

        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')
        commentEl.dataset.index = index

        commentEl.innerHTML = `
      <div class="comment-header">
        <div class="comment-author">${comment.name}</div>
        <div class="comment-date">${formattedDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    `

        commentsList.appendChild(commentEl)
    })

    commentsList.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = button.dataset.index
            const comment = commentsData[index]
            comment.isLiked = !comment.isLiked
            comment.likes += comment.isLiked ? 1 : -1
            rerender()
        })
    })

    
    const oldForm = document.querySelector('.add-form')
    if (oldForm) oldForm.remove()

    const formHtml = getToken()
        ? `
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          value="${getUserName()}"
          readonly
        />
        <textarea
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
        <div class="form-loading" style="display: none; margin-top: 20px;">
          Комментарий добавляется...
        </div>
      </div>
    `
        : `
      <div class="add-form">
        <button class="login-link add-form-button">Войти, чтобы добавить комментарий</button>
      </div>
    `

    const wrapper = document.createElement('div')
    wrapper.innerHTML = formHtml
    const formElement = wrapper.firstElementChild
    commentsList.parentNode.appendChild(formElement)

  
    const loginLink = formElement.querySelector('.login-link')
    if (loginLink) {
        loginLink.addEventListener('click', () => {
            import('./login.js').then(({ renderLogin }) => {
                const container = document.querySelector('.container')
                renderLogin(container)
            })
        })
    }

    const commentItems = commentsList.querySelectorAll('.comment')
    const formInput = document.querySelector('.add-form-text')

    commentItems.forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index
            const comment = commentsData[index]
            if (formInput) {
                formInput.value = `${comment.name}: ${comment.text}`
            }
        })
    })
}
