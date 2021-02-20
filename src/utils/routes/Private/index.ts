import { ZenRoute, ZenRouteID, ZenSection } from "../types";

export const privateRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.DASHBOARD,
      section: ZenSection.DASHBOARD,
      isPrivate: true,
      title: 'Dashboard',
      path: '/'
   },
    // ============================ //
   {
      _id: ZenRouteID.ME,
      section: ZenSection.ME,
      isPrivate: true,
      title: 'Me',
      path: '/me'
   },
   /*
   example of a detail page
   {
      _id: ZenRouteID.EXAMPLE_DETAIL,
      section: ZenSection.EXAMPLE,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.EXAMPLE_LIST,
      title: 'Detail example',
      path: '/example/detail/:_id',
      as: ({ _id }) => `/example/detail/${_id}`
   }
   */
]