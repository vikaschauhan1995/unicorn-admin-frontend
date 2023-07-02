import { PERMISSION_OBJ_KEY_KEY } from "../redux/Permission/constants";


export default (permission, permissions, userType) => {
  try {
    if (userType === "root") {
      return true;
    }
    for (let x = 0; x < permissions.length; x++) {
      if (permission === permissions[x]?.[PERMISSION_OBJ_KEY_KEY]) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}