import React from 'react'

import Header from '../common/header'
import MenuMobile from '../common/menuMobile'
import Footer from '../common/footer'
import Content from '../content/content'
import Hidden from '@material-ui/core/Hidden';

export default () => (
  <>
    <Header />
    <Content />
    <Footer />
    <Hidden smUp>
      <MenuMobile />
    </Hidden>
  </>
)