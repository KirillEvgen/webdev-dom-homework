const host = 'https://wedev-api.sky.pro/api/v2/KirillEvg'
const autHost = 'https://wedev-api.sky.pro/api/user'

let token = localStorage.getItem('token') || ''
let userName = localStorage.getItem('userName') || ''

export const setToken = (newToken) => {
    token = newToken
    localStorage.setItem('token', newToken)
}

export const getToken = () => token

export const setUserName = (name) => {
    userName = name
    localStorage.setItem('userName', name)
}

export const getUserName = () => userName

export const clearAuth = () => {
    token = ''
    userName = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
}

export const fetchComments = () => {
    return fetch(host + '/comments', {
        headers: {
            authorization: token ? `Bearer ${token}` : undefined,
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка загрузки: ${res.status}`)
            }
            return res.json()
        })
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.is_liked,
                created_at: comment.date,
            }))
        })
}

export const postComment = (name, text) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    })
}

export const login = (login, password) => {
    return fetch(autHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(autHost, {
        method: 'POST',
        body: JSON.stringify({ name, login, password }),
    })
}
