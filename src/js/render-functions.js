import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Створюємо екземпляр SimpleLightbox.
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryContainer = document.querySelector('.gallery');
  if (!galleryContainer) {
    console.error('Gallery container not found.');
    return;
  }

  const galleryMarkup = images
    .map(
      image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
                <div class="image-info">
                    <div class="info-item">
                        <b>Likes</b>
                        <p>${image.likes}</p>
                    </div>
                    <div class="info-item">
                        <b>Views</b>
                        <p>${image.views}</p>
                    </div>
                    <div class="info-item">
                        <b>Comments</b>
                        <p>${image.comments}</p>
                    </div>
                    <div class="info-item">
                        <b>Downloads</b>
                        <p>${image.downloads}</p>
                    </div>
                </div>
            </a>
        </li>
    `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових елементів
}


export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
  }
}


export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('hidden'); // Прибираємо клас 'hidden'
  }
}


export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden'); // Додаємо клас 'hidden'
  }
}


export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more-button');
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('hidden');
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more-button');
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('hidden');
  }
}


export function scrollToNextGroup() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}