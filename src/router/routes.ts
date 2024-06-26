import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Views/IndexView.vue'), children: [
          { path: '', name: 'AppsView', component: () => import('pages/Views/AppsView.vue') },
          { path: '/TutorialView', name: 'TutorialView', component: () => import('pages/Views/TutorialView.vue') },
          { path: '/HouseOfTheBreadView', name: 'HouseOfTheBreadView', component: () => import('pages/Views/HouseOfTheBreadView.vue') },
          { path: '/RushdownRivalsReloadedView', name: 'RushdownRivalsReloadedView', component: () => import('pages/Views/RushdownRivalsReloadedView.vue') },
          { path: '/MetroCopView', name: 'MetroCopView', component: () => import('pages/Views/MetroCopView.vue') },
          { path: '/EmulatorModeView', name: 'EmulatorModeView', component: () => import('pages/Views/EmulatorModeView.vue') },
        ]
      },
      {
        path: '/Pad', component: () => import('pages/Pads/IndexPad.vue'), children: [
          { path: '', name: 'AppsPad', component: () => import('pages/Pads/AppsPad.vue') },
          { path: '/TutorialPad', name: 'TutorialPad', component: () => import('pages/Pads/TutorialPad.vue') },
          { path: '/HouseOfTheBreadPad', name: 'HouseOfTheBreadPad', component: () => import('pages/Pads/HouseOfTheBreadPad.vue') },
          { path: '/RushdownRivalsReloadedPad', name: 'RushdownRivalsReloadedPad', component: () => import('pages/Pads/RushdownRivalsReloadedPad.vue') },
          { path: '/MetroCopPad', name: 'MetroCopPad', component: () => import('pages/Pads/MetroCopPad.vue') },
          { path: '/EmulatorModePad', name: 'EmulatorModePad', component: () => import('pages/Pads/EmulatorModePad.vue') },
        ]
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
