import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollToNextGroup,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more-button');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15;

hideLoadMoreButton();
hideLoader();

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = searchInput.value.trim();
  if (!currentQuery) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
      backgroundColor: 'rgba(255, 193, 7, 0.8)',
      maxWidth: '432px',
      minHeight: '88px',
      padding: '20px',
    });
    searchInput.value = '';
    return;
  }
  currentPage = 1;
  totalHits = 0; 

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query.<br>Please try again!',
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 0.8)',
        maxWidth: '432px',
        minHeight: '88px',
        padding: '20px',
        html: true,
      });
    } else {
      createGallery(data.hits);

     
      if (totalHits > currentPage * perPage) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          backgroundColor: 'rgba(76, 175, 80, 0.8)',
          maxWidth: '432px',
          minHeight: '88px',
          padding: '20px',
          color: '#ffffff',
          html: true,
        });
        hideLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        error.message ||
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
      backgroundColor: 'rgba(239, 64, 64, 0.8)',
      maxWidth: '432px',
      minHeight: '88px',
      padding: '20px',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    scrollToNextGroup();
    
    if (totalHits > currentPage * perPage) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        maxWidth: '432px',
        minHeight: '88px',
        padding: '20px',
        color: '#ffffff',
        html: true,
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        error.message ||
        'An error occurred while loading more images. Please try again later.',
      position: 'topRight',
      backgroundColor: 'rgba(239, 64, 64, 0.8)',
      maxWidth: '432px',
      minHeight: '88px',
      padding: '20px',
    });
  } finally {
    hideLoader();
  }
});