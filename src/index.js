const postForm = document.getElementById('post-form')
const postInput = document.getElementById('post-input')
const postList = document.getElementById('post-list')
const postURL = `http://localhost:3000/posts`

function fetchPosts() {
    fetch(postURL)
    .then(res => res.json())
    .then(posts => posts.forEach(post => renderPost(post.content)))
}

postForm.addEventListener("submit", submitPost)

function submitPost() {
    //prevents reset of browser on submit
    event.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: postInput.value 
        })
    }
    fetch(postURL, configObj)

    renderPost(postInput.value)
}

//render post to the dom
function renderPost(post) {
    //creates two elements 
    const li = document.createElement('li')
    const p = document.createElement('p')

    //assigns the value of id=post-input to the p tag created on line 13. when we express the p tag on the page, we are showing the postInput.value 
    p.innerText = post
    
    //creates a new form for comments and assigns them to a variable
    const commentForm = document.createElement('form')

    //inserts the form to the DOM
    commentForm.innerHTML += `<input type="text"><input type="submit">`

    //creates event listener for the new comment submit button on line 22
    commentForm.addEventListener("submit", submitComment)

    //creates variable for new ul element
    const commentList = document.createElement('ul')

    //assigns what will be included in the new li we created when we submit a post
    li.append(p, commentForm, commentList)

    //adds the new li created (line 31) to the DOM to id="post-list"
    postList.appendChild(li)

    //resets the form inputs.. removes the text from the box on submit
    postForm.reset()
}

function submitComment(e) {
    e.preventDefault()
    const commentInput = e.target.children[0].value
    const commentList = e.target.nextElementSibling
    
    const li = document.createElement('li')
    li.innerText = commentInput
    commentList.appendChild(li)
    
    e.target.reset()
}

fetchPosts()