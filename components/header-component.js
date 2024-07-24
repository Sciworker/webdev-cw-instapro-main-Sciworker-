import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element }) {
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
        user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
      ${
        user
          ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
  </div>
  
`;

  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (user) {
        goToPage(ADD_POSTS_PAGE);
      } else {
        goToPage(AUTH_PAGE);
      }
    });

  element.querySelector(".logo").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });

  element.querySelector(".logout-button")?.addEventListener("click", logout);

  return element;
}

// export const renderHeaderComponent = ({ appEl, user, goToPage }) => {
//   const headerContainer = document.createElement('div');
//   headerContainer.className = 'header-container';

//   headerContainer.innerHTML = `
//     <header>
//       <h1>Welcome ${user ? user.name : 'Guest'}</h1>
//       ${user ? '<button id="logout-btn">Logout</button>' : ''}
//     </header>
//   `;

//   appEl.prepend(headerContainer);

//   if (user) {
//     document.getElementById('logout-btn').addEventListener('click', () => {
//       goToPage('logout');
//     });
//   }
// };
