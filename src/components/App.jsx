import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from './api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function fetchFoo() {
      try {
        setLoading(true);
        const { responseImages, totalPages } = await fetchImages(
          searchQuery,
          page
        );

        if (responseImages.length === 0) {
          toast.warn('Didn`t find anything, please change search query');
        }

        setImages(prevState => [...prevState, ...responseImages]);
        setTotalPages(totalPages);
      } catch (error) {
        toast.error('we have a problem');
      } finally {
        setLoading(false);
      }
    }
    fetchFoo();
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      toast.warn('Please change your search query');
    } else {
      setSearchQuery(query);
      setImages([]);
      setPage(1);
    }
  };

  const incrementPage = () => setPage(prevState => prevState + 1);

  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridGap: `16px`,
        paddingBottom: `24px`,
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {images.length !== 0 && totalPages !== page && !loading && (
        <Button onClick={incrementPage} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
