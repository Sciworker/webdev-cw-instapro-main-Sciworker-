import { renderHeaderComponent } from "./header-component.js";
import { goToPage, user } from "../index.js";
import { likePost, unlikePost } from "../api.js";


export const renderUserPostsPageComponent = ({ appEl, posts }) => {
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array or undefined:", posts);
    posts = [];
  }

  appEl.innerHTML = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${posts.map(post => `
          <li class="post">
            <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button">
                <img src="./assets/images/${post.isLiked ? 'like-active.svg' : 'like-not-active.svg'}">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes.map(like => `${like.name} `).join('')}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
            ${dateFns.formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: dateFns.locale.ru })}
            </p>
          </li>
        `).join('')}
      </ul>
    </div>`;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", () => {
      const postId = likeButton.dataset.postId;
      const post = posts.find(post => post.id === postId);
      const isLiked = post.isLiked;

      if (isLiked) {
        unlikePost({ postId, token: getToken() }).then(() => {
          // Обновляем локально список постов после успешного отзыва лайка
          post.isLiked = false;
          post.likes = post.likes.filter(like => like.id !== user.id);
          renderUserPostsPageComponent({ appEl, posts }); // Обновляем текущую страницу
        }).catch(error => {
          console.error("Ошибка отзыва лайка:", error);
          alert("Ошибка отзыва лайка: " + error.message);
        });
      } else {
        likePost({ postId, token: getToken() }).then(() => {
          // Обновляем локально список постов после успешного лайка
          post.isLiked = true;
          post.likes.push({ id: user.id, name: user.name });
          renderUserPostsPageComponent({ appEl, posts }); // Обновляем текущую страницу
        }).catch(error => {
          console.error("Ошибка лайка:", error);
          alert("Ошибка лайка: " + error.message);
        });
      }
    });
  }
};

const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};
