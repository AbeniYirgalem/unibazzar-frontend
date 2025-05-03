import React from 'react'
import DashboardHome from '../components/TutorDashboard/DashboardHome'
import MyTutoringServices from '../components/TutorDashboard/MyTutoringServices'
import Bookings from '../components/TutorDashboard/Bookings'
import Earnings from '../components/TutorDashboard/Earnings'

function TutorDashboard() {
  return (
      <div>
          <DashboardHome />
          <MyTutoringServices />
          <Bookings />
          <Earnings />
    </div>
  )
}

export default TutorDashboard