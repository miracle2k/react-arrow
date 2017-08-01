react-arrow
===========

React component that renders an SVG arrow. You ca use this to point at things.

See a demo: https://miracle2k.github.io/react-arrow/


Installation
------------

```bash
$ npm install @miracle2k/react-arrow
```


Sample
------

```javascript
import Arrow from '@miracle2k/react-arrow';

const renderArrow = props => (
  <Arrow
    angle={45}
    length={100}
    style={{
      width: '100px'
    }}
  />
)
```


Properties
----------

**angle** - where to point. ``angle={0}`` points to the top, going clock-wise.
``angle={90}`` points to the right.

**length** - the length of the arrow. Note that since this is SVG, the
length really means the size of the line vs the size of the arrow head.
You'll just use a CSS ``style``, as in the sample, the determine how
large the arrow should be on your page.

**color** - color of the line and arrow head.

**arrowHeadFilled** - set this to false to have a simple arrow head
that is must a short stroke on both sides.

**lineWidth** - Use this to make the arrow fatter.

**lineDashed** - Makes the line dashed. Pass either true, or any value
that the SVG property ``strokeDasharray`` would accept.