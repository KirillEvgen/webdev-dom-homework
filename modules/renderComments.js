import { commentsData } from './data.js'

export function renderComments(commentsList, textInput, rerender) {
    commentsList.innerHTML = ''

    commentsData.forEach((comment, index) => {
        const formattedDate = comment.created_at
            ? new Date(comment.created_at).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
              }).replace(',', '')
            : ''

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

    commentsList.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index
            const comment = commentsData[index]
            textInput.value = `${comment.name}: ${comment.text}`
        })
    })
}