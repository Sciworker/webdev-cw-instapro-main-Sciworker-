import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
      <div class="upload-image">
        ${
          imageUrl
            ? `
            <div class="file-upload-image-container">
              <img class="file-upload-image" src="${imageUrl}">
              <button class="file-upload-remove-button button">Заменить фото</button>
            </div>
            `
            : `
              <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
              </label>
            `
        }
      </div>
    `;

    const fileInputElement = element.querySelector(".file-upload-input");

    if (fileInputElement) {
      fileInputElement.addEventListener("change", () => {
        const file = fileInputElement.files[0];
        if (file) {
          const labelEl = element.querySelector(".file-upload-label");
          labelEl.setAttribute("disabled", true);
          labelEl.textContent = "Загружаю файл...";
          uploadImage({ file })
            .then(({ fileUrl }) => {
              imageUrl = fileUrl;
              onImageUrlChange(imageUrl);
              render(); // Перерисовка компонента с новым URL изображения
            })
            .catch(error => {
              console.error("Ошибка загрузки файла:", error);
              labelEl.removeAttribute("disabled");
              labelEl.textContent = "Выберите фото";
            });
        }
      });
    }

    const removeButtonElement = element.querySelector(".file-upload-remove-button");

    if (removeButtonElement) {
      removeButtonElement.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render(); // Перерисовка компонента для удаления изображения
      });
    }
  };

  render();
}