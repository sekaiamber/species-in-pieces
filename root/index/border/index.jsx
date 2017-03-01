import React from 'react';
import './index.scss';

export default class Border extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div id="border">
        <div className="frames">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="corners">
          <div />
          <div />
        </div>
      </div>
    );
  }
}
