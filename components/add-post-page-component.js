import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let uploadedImageUrl = ""; // Переменная для хранения URL загруженного изображения

  // Определите функцию для обработки изменения URL изображения
  function handleImageUrlChange(newImageUrl) {
    uploadedImageUrl = newImageUrl; // Сохраните новый URL изображения
  }

  
  const render = () => {
    // Реализовать страницу добавления поста
    const appHtml = `
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container"></div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" id="description" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange: handleImageUrlChange,
    });

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description").value; // Получить описание из textarea
      onAddPostClick({
        description: description,
        imageUrl: uploadedImageUrl, 
      });
    });
  };

  render();
}