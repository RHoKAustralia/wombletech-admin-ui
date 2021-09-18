import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DonationSummaryRow} from './DonationSummaryRow';
// import './style.css';

class DonationList extends Component {
  static propTypes = {
    donations: PropTypes.array
  };

  render() {
    return (
      <div>
        <h1>List of donations</h1>
        {this.props.donations.map(it => (
          <DonationSummaryRow {...it}/>
        ))}
      </div>
    );
  }
}

export { DonationList };
