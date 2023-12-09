import config from '~/config';

import { AddSidebarLayout } from '~/components/Layouts';

import Home from '~/Pages/Home';
import Product from '~/Pages/Product';
import Book from '~/Pages/Book';
import Contact from '~/Pages/Contact';

//no Login open
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product, layout: AddSidebarLayout },
    { path: config.routes.book, component: Book },
    { path: config.routes.contact, component: Contact },
];

//Login open
const privateRoutes = [];

export { publicRoutes, privateRoutes };
