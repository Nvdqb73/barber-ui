import { AddSidebarLayout } from '~/components/Layouts';

import Home from '~/Pages/Home';
import Product from '~/Pages/Product';
import Book from '~/Pages/Book';

//no Login open
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product, layout: AddSidebarLayout },
    { path: '/book', component: Book },
];

//Login open
const privateRoutes = [];

export { publicRoutes, privateRoutes };
