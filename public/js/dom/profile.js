const postsDiv = document.querySelector(".posts");
const logout = document.querySelector(".logout");

logout.addEventListener("click", event => (document.cookie = ""));

window.onload = () => {
  fetch("GET", null, "/get-posts")
    .then(renderPosts)
    .catch(renderError);
};

const renderPosts = posts => {
  JSON.parse(posts).forEach(post => {
    const postContainer = document.createElement("div");
    const postHeader = document.createElement("div");
    const postBody = document.createElement("div");
    const userIcon = document.createElement("i");
    const headerUsername = document.createElement("span");
    const postContent = document.createElement("span");

    postContainer.classList.add("post-container");
    postHeader.classList.add("post-header");
    postBody.classList.add("post-body");
    userIcon.classList.add("fas", "fa-user-circle", "post--header-icon");

    headerUsername.textContent = post.user_name;
    postContent.textContent = post.post_content;

    postHeader.appendChild(userIcon);
    postHeader.appendChild(headerUsername);
    postBody.appendChild(postContent);
    postContainer.appendChild(postHeader);
    postContainer.appendChild(postBody);
    postsDiv.appendChild(postContainer);
  });
};

const renderError = error => {
  console.log(error);
};
