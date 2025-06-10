const host = 'https://wedev-api.sky.pro/api/v1/kirill-churkin'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    date: new Date(comment.created_at)
                        .toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })
                        .replace(',', ''),
                    likes: comment.likes,
                    isLiked: comment.is_liked,
                }
            })
            return appComments
        })
}

export const postComment = (name, text) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    }).then(() => {
        return fetchComments()
    })
}
