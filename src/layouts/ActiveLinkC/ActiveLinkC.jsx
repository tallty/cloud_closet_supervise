import React, { Component } from 'react';
import { Link } from 'react-router'

export default class ActiveLinkC extends Component {
  render() {
    return <Link {...this.props} activeClassName="active_c"/>
  }
}