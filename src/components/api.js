import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '35690812-dd9c3c40d4b5b42ada9774bd3';
const PER_PAGE = 12;

export const fetchImages = async (searchQuery, page) => {
  const params = {
    orientation: 'horizontal',
    per_page: '12',
    image_type: 'photo',
    page: page,
    q: searchQuery,
  };
  const response = await axios.get(`/?key=${API_KEY}&page=${page}`, { params });

  const responseImages = normalisedImages(response.data.hits);
  const totalPages = Math.ceil(response.data.totalHits / PER_PAGE);
  return { responseImages, totalPages };
};

const normalisedImages = responseImages =>
  responseImages.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));