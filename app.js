async function fetchPosts() {
    try {
        showMessage('Chargement...')
        const newPosts = await fetch('https://jsonplaceholder.typicode.com/posts/?_limit=10', {
            method: 'GET',
            headers: {
                Accept: "application/json"
            }
        }) 
        if (!newPosts.ok) {
            throw new Error('Impossible de récupérer les données', {cause: newPosts})
        }    
        const posts = await newPosts.json()   
        document.querySelector('#loader').remove()
        // const doc = document.contains('#loader')
        // doc.remove()
        createPostsWithText('#lastPosts', 'article', 'h2', 'p', posts)        
    } catch(error) {
        showMessage(error.message, 'red')
        return
    }
}
fetchPosts()
// createPost('#lastPosts', 'div', 'p')

function createPost(tagName, element, subElement) {
    const selector = document.querySelector(tagName)
    const newDiv = document.createElement(element)
    const newBody = document.createElement(subElement)
    newDiv.appendChild(newBody)
    selector.append(newDiv)
}

/**
 * Create HTML Elements with 3 levels (exemple: div > h2 > p) 
 * and insert a title and a body from the array/object
 * @param {{class: id }} tagName 
 * @param {{string}} element 
 * @param {{HTML: string}} title 
 * @param {string} subElement 
 * @param {Array} arrElements 
 */
// function createPostsWithText(tagName, element, title, subElement, arrElements) {
//     const selector = document.querySelector(tagName)
//     for (const arrElement of arrElements) {
//         const newDiv = document.createElement(element)
//         const newBody = document.createElement(subElement)
//         const newTitle = document.createElement(title)
//         newDiv.appendChild(newTitle)
//         newDiv.appendChild(newBody)
//         selector.append(newDiv)

//         newTitle.innerText = arrElement.title
//         newBody.innerText = arrElement.body
//     }
// }

// function createArticle(content) {
//     const article = document.createElement('article')
//     article.append(createElementWithText('h2', content.title))
//     article.append(createElementWithText('p', content.body))
//     return article
// }

function createPostsWithText(selector, tagName, firstChild, subChild, arrElements) {
    const select = document.querySelector(selector)
    for (const arrElement of arrElements) {
        select.append(createArticle(arrElement, tagName, firstChild, subChild))
    }
}

function createArticle(arrContent, tagName, firstChild, subChild) {
    const article = document.createElement(tagName)
    article.append(createElementWithText(firstChild, arrContent.title))
    article.append(createElementWithText(subChild, arrContent.body))
    return article
}


function createElementWithText(tagName, content) {
    const element = document.createElement(tagName)
    element.innerText = content
    return element
}

function showMessage(message, color = '') {
    let newSpan= document.querySelector('#loader')
    if (!newSpan) {
        const span = document.querySelector('#lastPosts')
        newSpan = document.createElement('span')
        newSpan.id = "loader"
        span.append(newSpan)
    }
    newSpan.innerText = message
    newSpan.style.color = (color)
}
