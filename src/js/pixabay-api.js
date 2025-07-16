import axios from 'axios';

const forbiddenTags = ['tank', 'war', 'danger', 'military', 'army', 'battle'];

export async function getImagesByQuery(query, page = 1) {
 
  const API_KEY = '50678696-ed6f097088bf5690dd98584b9';
  const BASE_URL = 'https://pixabay.com/api/';
  const PER_PAGE = 15; 

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page, 
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    const filteredHits = response.data.hits.filter(hit => {
      const tagsArray = hit.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase());
      return !tagsArray.some(tag => forbiddenTags.includes(tag));
    });
    return { ...response.data, hits: filteredHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images from Pixabay.');
  }
}