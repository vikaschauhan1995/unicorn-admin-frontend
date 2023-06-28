import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../style/AddSubuserForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPermissionsAction } from '../redux/Permission/actions';
import { PERMISSION_REDUCER } from '../redux/Permission/constants';

const AddSubuserForm = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state[PERMISSION_REDUCER]);

  const submitForm = (event) => {

  }
  console.log("state=>", state);
  useEffect(() => {
    dispatch(getAllPermissionsAction());
  }, [dispatch]);
  return (
    <div>
      onSubuserForm
      <form onSubmit={submitForm}>
        {/* <Form.Control as="select" multiple onChange={onSelectOptionChange}>

        </Form.Control> */}
      </form>
    </div>
  )
}

export default AddSubuserForm
