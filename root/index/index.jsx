import React from 'react';
import Species from './species';
import infos, { names } from './species/infos';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameIndex: 0,
      currentInfo: infos[names[0]],
      background: infos[names[0]].background,
    };
  }
  handleIndexChange(change) {
    const nameIndex = this.state.nameIndex + change;
    if (nameIndex < 0 || nameIndex >= names.length) return;
    const currentInfo = infos[names[nameIndex]];
    this.setState({
      nameIndex,
      currentInfo,
      background: currentInfo.background,
    });
  }
  render() {
    return (
      <div id="container" style={{ backgroundColor: this.state.background }}>
        <Species info={this.state.currentInfo} />
        <div className="control-pad">
          <button onClick={this.handleIndexChange.bind(this, -1)}>Previous</button>
          <button onClick={this.handleIndexChange.bind(this, 1)}>Next</button>
        </div>
      </div>
    );
  }
}
