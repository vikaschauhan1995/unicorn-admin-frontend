import React from 'react'
import AddSubuserForm from '../components/AddSubuserForm'
import SubuserList from '../components/Subuser/SubuserList'

const Subuser = () => {
  return (
    <div className="mx-3">
      <AddSubuserForm />
      <SubuserList />
    </div>
  )
}

export default Subuser
