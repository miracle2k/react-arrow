import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

const Header = () => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          href="https://github.com/miracle2k/react-arrow"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          react-arrow demo
        </a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://github.com/miracle2k/react-arrow"
         style={{
            color: 'white',
            fontSize: '0.7em'
          }}
          >Find me on Github</a>
      </h1>
    </div>
  </div>
)

const TemplateWrapper = ({
  children
}) => (
    <div>
      <Helmet
        title="react-arrow demo page"
        meta={[
          { name: 'description', content: 'A react svg arrow component.' },
          { name: 'keywords', content: 'react, arrow, svg' },
        ]}
      />
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        {children()}
      </div>
    </div>
  )

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
