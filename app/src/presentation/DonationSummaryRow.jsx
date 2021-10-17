import PropTypes from 'prop-types'

const DonationSummaryRow = props => (
  <div>
    <div>Donor: {props.name}</div>
    <div>Email: {props.email}</div>
    <div>Description: {props.description}</div>
    <div>Date: {props.submitDate}</div>
  </div>
)

DonationSummaryRow.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  suburb: PropTypes.string,
  region: PropTypes.string,
  donationType: PropTypes.string,
  description: PropTypes.string,
  submitDate: PropTypes.string
}

export { DonationSummaryRow }
