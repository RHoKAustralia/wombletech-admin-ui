import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DonationSummaryRow extends Component {
  static propTypes = {
    status: PropTypes.string,
    donor: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    itemCount: PropTypes.number,
  };

  render() {
    return (
      <div>
        <div>Status: {this.props.status}</div>
        <div>Donor: {this.props.donor}</div>
        <div>Description: {this.props.description}</div>
        <div>Date: {this.props.date}</div>
        <div>Item Count: {this.props.itemCount}</div>
      </div>
    );
  }
}

export { DonationSummaryRow };
