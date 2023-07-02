


const isRouteAccessible = (route, permissions, user_type) => {
  if (user_type === "root") {
    return true;
  }
  var isAccessible = false;
  if (!permissions || permissions?.length === 0) {
    return false;
  }
  // console.log(permissions);
  if (permissions?.length > 0) {
    const routeRemovedPath = route.substr(1, route.length);
    return permissions.includes(routeRemovedPath);
    // console.log(routeRemovedPath);
  }
  return isAccessible;
}

export default isRouteAccessible;