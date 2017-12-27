import React, { Component } from 'react';
import { render } from 'react-dom';

import Year from './years';

export default class Seasons extends Component {

  render() {
    return (
      <ul>
        <Year />
      </ul>
    );
  }
}

module.exports = Seasons;