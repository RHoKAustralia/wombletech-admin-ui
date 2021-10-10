import PropTypes from 'prop-types'

const DonationSummaryRow = props => (
  <div>
    <div>Status: {props.status}</div>
    <div>Donor: {props.donor}</div>
    <div>Description: {props.description}</div>
    <div>Date: {props.date}</div>
    <div>Item Count: {props.itemCount}</div>
  </div>
)

DonationSummaryRow.propTypes = {
  status: PropTypes.string,
  donor: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  itemCount: PropTypes.number
}

export { DonationSummaryRow }
