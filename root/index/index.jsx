import React from 'react';
import Species from './species';
import infos, { names } from './species/infos';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameIndex: 0,
    };
  }
  handleIndexChange(change) {
    const nameIndex = this.state.nameIndex + change;
    if (nameIndex < 0 || nameIndex >= names.length) return;
    this.setState({
      nameIndex,
    });
  }
  render() {
    return (
      <div id="container">
        <Species info={infos[names[this.state.nameIndex]]} />
        
        <div className="control-pad">
          <button onClick={this.handleIndexChange.bind(this, -1)}>Previous</button>
          <button onClick={this.handleIndexChange.bind(this, 1)}>Next</button>
        </div>
      </div>
    );
  }
}
