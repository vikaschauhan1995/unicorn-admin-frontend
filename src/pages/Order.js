import React from 'react'
import {
  useParams
} from "react-router-dom";
const Order = () => {
  const { _id } = useParams();
  return (
    <div>
      Order page id: {_id}
    </div>
  )
}

export default Order
