import React from 'react'
import Link from 'gatsby-link'
import Arrow from '../../../index';


const IndexPage = () => (
  <div>
    <h3>Have a look at some of these samples:</h3>

    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    }}>

      <RotatingSampleArrow
        style={{width: '100px', height: '100px'}}
        angle={10}
        length={50}
      />

      <RotatingSampleArrow
        style={{width: '100px', height: '100px'}}
        angle={-87}
        length={350}
        lineWidth={15}
      />

      <RotatingSampleArrow
        style={{width: '100px', height: '100px'}}
        angle={95}
        length={150}
        color="#9C27B0"
        arrowHeadFilled={false}
      />

      <RotatingSampleArrow
        style={{width: '100px', height: '100px'}}
        angle={87}
        length={100}
        color="#F44336"
      />

      <RotatingSampleArrow
        style={{width: '100px', height: '100px'}}
        angle={160}
        length={60}
        lineDashed={true}
      />

      <RotatingSampleArrow
        style={{width: '100px', height: '100px'}}
        angle={300}
        length={60}
        lineDashed={"0.9"}
        arrowHeadFilled={false}
      />
    </div>
  </div>
)

export default IndexPage



class RotatingSampleArrow extends React.Component {
  constructor(props) {
    super();
    this.state = {
      angle: props.angle
    }
  }

  componentDidMount() {
    let speed = Math.max(10, (Math.random()) * 100);
    let direction = Math.random() > 0.5 ? 1 : -1;
    console.log(speed);
    this.rotater = window.setInterval(() => {
      let newAngle = this.state.angle + direction;
      if (newAngle > 360) {
        newAngle = 360 - newAngle;
      }
      if (newAngle < -360) {
        newAngle = 360 + newAngle;
      }
      this.setState({angle: newAngle})
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.rotater);
  }

  render() {
    return <SampleArrow
      {...this.props}
      angle={this.state.angle}
    />
  }
}


const SampleArrow = (props) => {
  let {style, ...relevantProps} = props;

  let styleText =
    Object.keys(relevantProps).map((key) => `${key}=${relevantProps[key]}`)
    .join(', ')

  return <div style={{
    margin: '10px',
    width: '200px',
    textAlign: 'center'
  }}>
    <div>
      <Arrow {...props} />
    </div>
    <div style={{
      fontSize: '14px',
      display: 'inline-block',
      color: 'white',
      background: '#222222',
      padding: '10px',
      borderRadius: '4px'
    }}>
      {styleText}
    </div>
  </div>
}