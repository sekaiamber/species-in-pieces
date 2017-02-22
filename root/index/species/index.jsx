import React from 'react';
import { TweenLite } from 'gsap';
import './index.scss';

function changePolygons({ target, options }) {
  const { currentInfo, nextInfo } = options;
  const obj = {
    one: currentInfo.points[0],
    two: currentInfo.points[1],
    three: currentInfo.points[2],
    four: currentInfo.points[3],
    five: currentInfo.points[4],
    six: currentInfo.points[5],
  };

  TweenLite.to(obj, 1, {
    one: nextInfo.points[0],
    two: nextInfo.points[1],
    three: nextInfo.points[2],
    four: nextInfo.points[3],
    five: nextInfo.points[4],
    six: nextInfo.points[5],
    onUpdate() {
      target.setAttribute('points', `${obj.one},${obj.two} ${obj.three},${obj.four} ${obj.five},${obj.six}`);
    },
  });

  TweenLite.fromTo(target, 1, {
    fill: currentInfo.fill,
  }, {
    fill: nextInfo.fill,
  });
}

export default class Species extends React.Component {
  componentDidMount() {
    const nextInfo = this.props.info;
    for (let i = 0; i < nextInfo.polygons.length; i += 1) {
      const x = parseInt(Math.random() * 800, 10);
      const y = parseInt(Math.random() * 800, 10);
      changePolygons({
        target: this.polygons[i],
        options: {
          currentInfo: { fill: '#eeeeee', points: [x, y, x, y, x, y], 'fill-opacity': 1 },
          nextInfo: nextInfo.polygons[i],
        },
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const currentInfo = this.props.info;
    const nextInfo = nextProps.info;
    for (let i = 0; i < nextInfo.polygons.length; i += 1) {
      changePolygons({
        target: this.polygons[i],
        options: {
          currentInfo: currentInfo.polygons[i],
          nextInfo: nextInfo.polygons[i],
        },
      });
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  polygons = []
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-100 -100 1000 1000" preserveAspectRatio="xMidYMid meet" ref={c => this.svg = c} className="species-svg">
        {(() => {
          const ret = [];
          for (let i = 0; i < 300; i += 1) {
            ret.push(<polygon key={i} ref={c => this.polygons[i] = c} />);
          }
          return ret;
        })()}
      </svg>
    );
  }
}

/* <polygon key={i} fill={polygon.fill} fillOpacity={polygon['fill-opacity']} points={`${polygon.points[0][0]},${polygon.points[0][1]} ${polygon.points[1][0]},${polygon.points[1][1]} ${polygon.points[2][0]},${polygon.points[2][1]}`} />*/
