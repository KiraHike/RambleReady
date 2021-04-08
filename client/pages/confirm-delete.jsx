import React from 'react';
import AppContext from '../lib/app-context';

export default class ConfirmDelete extends React.Component {

  render() {
    return (
      <div className='container confirm-delete'>
        <a className='anchor-right' href='#edittrip'>
          <button className='button-close'>x</button>
        </a>
        <div>
          Trip Details
        </div>
        <button className='fas fa-check-square' />
      </div >
    );
  }
}

ConfirmDelete.contextType = AppContext;
