export const routeComponents = {
  Home: () => import('../pages/Home'),
  Events: () => import('../pages/Events'),
  Gallery: () => import('../pages/Gallery'),
  Resources: () => import('../pages/Resources'),
  Contact: () => import('../pages/Contact'),
  Recruitment: () => import('../pages/Recruitment'),
  Admin: () => import('../pages/Admin'),
  AdminAuth: () => import('../pages/AdminAuth'),
  AddMember: () => import('../pages/AddMember'),
  EditEvent: () => import('../pages/EditEvent'),
  EventDetails: () => import('../pages/EventDetails'),
  NotFound: () => import('../pages/NotFound'),
};

export const preloadRoute = (path) => {
  if (path === '/') routeComponents.Home();
  else if (path.startsWith('/events/')) routeComponents.EventDetails();
  else if (path.startsWith('/events')) routeComponents.Events();
  else if (path.startsWith('/gallery')) routeComponents.Gallery();
  else if (path.startsWith('/resources')) routeComponents.Resources();
  else if (path.startsWith('/contact')) routeComponents.Contact();
  else if (path.startsWith('/recruitment')) routeComponents.Recruitment();
};
