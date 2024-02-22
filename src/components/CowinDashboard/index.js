// Write your code here
import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CovinDashboard extends Component {
  state = {vaccinationDetails: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_data,
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
        })),
        vaccineByAge: data.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachGender => ({
          gender: eachGender.gender,
          count: eachGender.count,
        })),
      }
      this.setState({
        vaccinationDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderVaccinationStatus = () => {
    const {vaccinationDetails} = this.state
    return (
      <div>
        <VaccinationCoverage
          VaccinationCoverageDetails={vaccinationDetails.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationDetails.VaccinationByGender}
        />
      </div>
    )
  }

  render() {
    return <div>{this.renderVaccinationStatus()}</div>
  }
}
export default CovinDashboard
