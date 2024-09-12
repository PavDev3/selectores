import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'selector',
    pathMatch: 'full',
  },

  {
    path: 'selector',
    loadChildren: () =>
      import('./selector/services/selector.routes').then(
        (m) => m.selectorRoutes
      ),
  },

  {
    path: '**',
    redirectTo: 'selector',
  },
];
