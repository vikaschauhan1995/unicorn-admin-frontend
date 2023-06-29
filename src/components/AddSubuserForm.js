import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import '../style/AddSubuserForm.scss';
import style from '../style/Button.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addSubUserAction } from '../redux/Subuser/actions';
import { PERMISSION_REDUCER, PERMISSION_LIST, PERMISSION_OBJ_KEY_KEY } from '../redux/Permission/constants';
import { SUBUSER_REDUCER, USER_TYPE, IS_SAVE_SUBUSER_LOADING, IS_SAVE_SUBUSER_ERROR } from '../redux/Subuser/constants';
import { getAllPermissionsAction } from '../redux/Permission/actions';

const EMAIL = 'email';
const PASSWORD = 'password';


const AddSubuserForm = () => {
  const [fields, setField] = useState([]);
  const [state, setState] = useState({
    [EMAIL]: '',
    [PASSWORD]: ''
  });
  const dispatch = useDispatch();
  const permissionReducerState = useSelector(state => state[PERMISSION_REDUCER]);
  const subuserReducerState = useSelector(state => state[SUBUSER_REDUCER])
  const permissionList = permissionReducerState?.[PERMISSION_LIST];
  const getPermissionObjFromKey = (objs, keys) => {
    if (objs?.length === 0 || keys?.length === 0) {
      return [];
    }
    const list = objs.filter(obj => {
      if (keys.includes(obj?.key)) {
        return obj;
      }
    });
    return list;
  }
  const submitForm = (event) => {
    event.preventDefault();
    const permissionObjList = getPermissionObjFromKey(permissionList, fields);
    const subuser = {
      [EMAIL]: state[EMAIL],
      [PASSWORD]: state[PASSWORD],
      permissions: permissionObjList,
      [USER_TYPE]: "subuser"
    }
    dispatch(addSubUserAction(subuser));
    // console.log("subuser", JSON.stringify(subuser));
  }
  const optionsListCreated = () => {
    const pList = permissionList?.length > 0 ? permissionList : [];
    const list = pList.map(item => {
      return (
        <option key={item?.[PERMISSION_OBJ_KEY_KEY]} value={item?.[PERMISSION_OBJ_KEY_KEY]}>{item?.[PERMISSION_OBJ_KEY_KEY]}</option>
      );
    });
    // console.log("list", list);
    return list;
  }
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value !== '' && value !== undefined && value !== null) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }
  }
  // console.log("subuserReducerState=>", subuserReducerState);
  useEffect(() => {
    dispatch(getAllPermissionsAction());
  }, [dispatch]);
  return (
    <div>
      onSubuserForm
      <form onSubmit={submitForm}>
        <label>Email:</label>
        <Form.Control
          type="email" name="email" onChange={handleChange} value={state[EMAIL]}
          placeholder="enter email as Sub-User"
        />
        <label>Password:</label>
        <Form.Control
          type="password" name="password" onChange={handleChange} value={state[PASSWORD]}
          placeholder="********"
        />
        <Form.Control as="select" multiple onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
          {optionsListCreated()}
        </Form.Control>
        <button className={style.btn} disabled={subuserReducerState?.[IS_SAVE_SUBUSER_LOADING]}>Submit</button>
      </form>
      *Sub-user can not be edited, but can be deleted with its given permissions
      {subuserReducerState[IS_SAVE_SUBUSER_ERROR] && <Alert key="danger" variant="danger">
        {subuserReducerState[IS_SAVE_SUBUSER_ERROR]}
      </Alert>}
    </div>
  )
}

export default AddSubuserForm;