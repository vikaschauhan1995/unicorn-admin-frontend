

const getActiveComponents = (permissionObj) => {
  const permission_obj = permissionObj?.permissions?.length > 0 ? permissionObj : [];
  const permissionArray = permission_obj?.permissions;
  const allActiveComponents = permissionArray?.map(permission => {
    return permission.componentToBeActive;
  });
  const filteredComponents = allActiveComponents?.filter((item, index) =>
    allActiveComponents.indexOf(item) === index
  );
  return filteredComponents ? filteredComponents : [];
}

export default getActiveComponents;