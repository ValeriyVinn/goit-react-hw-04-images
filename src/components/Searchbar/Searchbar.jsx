import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.error('Рядок пошуку пустий !');
    }
    this.setState({ searchQuery: '' });
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
          <button type="submit" className={css.Button}>
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  };
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};