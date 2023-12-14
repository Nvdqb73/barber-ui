import config from '~/config';

import { AddSidebarLayout } from '~/components/Layouts';

import ProductDetail from '~/components/feature/ProductDetail';
import Home from '~/Pages/Home';
import Product from '~/Pages/Product';
import Book from '~/Pages/Book';
import Contact from '~/Pages/Contact';
import Cart from '~/Pages/Cart';

//no Login open
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product, layout: AddSidebarLayout },
    { path: config.routes.product_details, component: ProductDetail },
    { path: config.routes.book, component: Book },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.cart, component: Cart },
];

//Login open
const privateRoutes = [];

export { publicRoutes, privateRoutes };
