import React from 'react'

import Header from '../common/header'
import Logo from '../common/logo'
import Menu from '../common/menu'
import MenuMobile from '../common/menuMobile'
import Footer from '../common/footer'
import Content from '../content/content'
import Hidden from '@material-ui/core/Hidden';

export default () => (
  <>
    <Header />
    <Logo />
    <Hidden smUp>
      <MenuMobile />
    </Hidden>
    <Content />
    <Footer />
  </>
)