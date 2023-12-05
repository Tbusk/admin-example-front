import type { Route } from '@vaadin/router';


export type ViewRoute = Route & {
    title?: string;
    icon?: string;
    children?: ViewRoute[];
};

export const routes = [
    {
        path: '/users',
        component: 'main-view',
        title: 'Test',
        children: [
            {
                path: '',
                component: 'user-view',
                action: async () => { await import ('./views/users-view'); }
            }
        ]
    },
];

export const views: ViewRoute[] = [
    // Place routes below (more info https://hilla.dev/docs/routing)
    {
        path: 'about',
        component: 'users-view',
        icon: 'file',
        title: 'Users',
        action: async (_context, _command) => {
            await import('./views/users-view');
            return;
        },
    },
];