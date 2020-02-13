import React, { Component } from 'react';
import { Taggings } from '../api/taggings.js';

// Tag UI
export default class Tagging extends Component {
  render() {
    var tag = this.props.tagging.tag()
    return (
      <span className="c-tag">
        {tag.title}
      </span>
    );
  }
}