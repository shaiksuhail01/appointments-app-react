import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStarImage} = props
  const {id, title, dateString, isStarred} = appointmentDetails

  const starredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onClickStarImage(id)
  }
  return (
    <li>
      <div className="appointmentsListCont">
        <div className="appointmentItem">
          <div className="headContainer">
            <p className="name">{title}</p>
            <button
              type="button"
              className="starImageButton"
              onClick={onClickStar}
              data-testid="star"
            >
              <img src={starredImage} alt="star" />
            </button>
          </div>
          <p className="dateText">Date: {dateString}</p>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
