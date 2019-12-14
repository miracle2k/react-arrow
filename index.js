// http://thenewcode.com/1068/Making-Arrows-in-SVG

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const PolyLineStyle = {
  fill: 'none'
  // Not yet sure if this is a good property to set or not
  //vectorEffect: 'non-scaling-stroke'
};

const PathStyle = {
  fill: 'none'
};

function toRad(d) {
  return (d * Math.PI) / 180;
}

export default class Arrow extends PureComponent {
  static propTypes = {
    length: PropTypes.number,
    angle: PropTypes.number,
    color: PropTypes.string,
    arrowHeadFilled: PropTypes.bool,
    lineWidth: PropTypes.number,
    lineDashed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  };

  static defaultProps = {
    angle: 0,
    length: 50,
    color: '#231F20',
    arrowHeadFilled: true,
    lineWidth: 1,
    lineDashed: false
  };

  constructor() {
    super();
    if (!this.constructor.__counter) {
      this.constructor.__counter = 1;
    }
    this.uniqid = this.constructor.__counter++;
  }

  render() {
    let {
      length,
      angle,
      arrowHeadFilled,
      lineWidth,
      lineDashed,
      ...otherProps
    } = this.props;

    // By default, our sin math would let the angle rotate to
    // the left. Reverse the direction.
    angle = -angle + 180;
    angle = angle % 360;

    // Let's do some trig to calculate the viewbox.
    //
    // Assuming the arrow points top right, c is the arrow
    // length, a is the viewbox width, b is the viewbox height.

    // We know C is 90deg
    const B = angle;
    const C = 90;
    const A = 180 - C - B;
    const c = length;

    // Get all the sides
    let a = (c / Math.sin(toRad(C))) * Math.sin(toRad(A));
    let b = (c / Math.sin(toRad(C))) * Math.sin(toRad(B));

    // a, b can be negative if the angle. We will rewrite
    // those values to go inside the svg viewbox.
    const width = Math.abs(b);
    const height = Math.abs(a);

    let padding = 10;

    // Now we have a viewBox
    const viewBox = `0 0 ${width + padding * 2} ${height + padding * 2}`;

    function point(x, y) {
      if (b < 0) {
        x = width + padding * 2 - x;
      }
      if (a < 0) {
        y = height + padding * 2 - y;
      }
      return `${x},${y}`;
    }

    const path = [
      `M${point(padding, padding)}`,
      `L${point(width + padding, height + padding)}`
    ];

    // TODO: Cooler line:
    // M16.7,178 c87.6-46.9,162.9-185.4,227-136.4C307.2,90.1,195,158.5,111,108.9C71,85.2,92.2,30.7,126,7

    const markerId = `Arrow-pointer-${this.uniqid}`;

    // Based on the props, determine the styles.
    const arrowHeadStyle = {
      ...PolyLineStyle,
      strokeWidth: 0,
      stroke: this.props.color
    };
    if (this.props.arrowHeadFilled) {
      arrowHeadStyle.fill = this.props.color;
    } else {
      arrowHeadStyle.strokeWidth = 1;
    }

    const lineStyle = {
      ...PathStyle,
      stroke: this.props.color,
      strokeWidth: this.props.lineWidth
    };

    if (lineDashed) {
      if (typeof lineDashed !== 'string') {
        lineDashed = '11, 5';
      }

      lineStyle.strokeDasharray = lineDashed;
    }

    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} {...otherProps}>
        <defs>
          <marker
            id={markerId}
            markerWidth="9"
            markerHeight="9"
            refX="8"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polyline points="1 1, 9 5, 1 9" style={arrowHeadStyle} />
          </marker>
        </defs>
        <path
          style={lineStyle}
          d={path.join(' ')}
          markerEnd={`url(#${markerId})`}
        />
      </svg>
    );
  }
}
