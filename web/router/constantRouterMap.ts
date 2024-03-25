import { RouteRecordRaw } from "vue-router";
console.log(location, "location");
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "总览",
  //   component: () => import("@web/components/LandingPage.vue"),
  // },
  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    name: "总览",
    component: () => import("@web/views/Home"),
  },
];

export default routes;
