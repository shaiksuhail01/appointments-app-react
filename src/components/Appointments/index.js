import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    starredButton: false,
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  addButton = () => {
    const {title, date} = this.state
    const dateString = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      dateString,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStarImage = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    const {starredButton} = this.state
    if (starredButton) {
      this.setState({starredButton: false})
    } else {
      this.setState({starredButton: true})
    }
  }

  showAppointments = () => {
    const {starredButton, appointmentsList} = this.state
    const filteredAppointments = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    if (starredButton === true) {
      return filteredAppointments.map(eachAppointment => (
        <AppointmentItem
          key={eachAppointment.id}
          appointmentDetails={eachAppointment}
          onClickStarImage={this.onClickStarImage}
        />
      ))
    }
    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        onClickStarImage={this.onClickStarImage}
      />
    ))
  }

  render() {
    const {title, date, starredButton} = this.state

    const styleStarredButton = starredButton ? 'styleButton' : ''

    return (
      <div className="divContainer">
        <div className="appointmentsContainer">
          <div className="inputAndImageContainer">
            <form>
              <h1 className="heading">Add Appointment</h1>
              <label className="labelText" htmlFor="titleInput">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="titleInput"
                className="inputEl"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitleInput}
              />
              <br />
              <label className="labelText" htmlFor="dateInput">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="dateInput"
                className="inputEl"
                value={date}
                onChange={this.onChangeDateInput}
              />
              <br />
              <button
                type="button"
                className="buttonEl"
                onClick={this.addButton}
              >
                Add
              </button>
            </form>
            <div className="appointmentImageCont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="buttonHeadContainer">
            <h1 className="heading2">Appointments</h1>
            <button
              type="button"
              className={`buttonStarred ${styleStarredButton}`}
              onClick={this.onClickStarredButton}
            >
              Starred
            </button>
          </div>
          <ul className="listsContainer">{this.showAppointments()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
