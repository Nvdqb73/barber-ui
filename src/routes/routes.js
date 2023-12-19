import config from '~/config';

import { AddSidebarLayout } from '~/components/Layouts';

import Login from '~/Pages/Login';
import Register from '~/Pages/Register';

import Home from '~/Pages/Home';
import ProductDetail from '~/components/feature/ProductDetail';
import Product from '~/Pages/Product';
import Book from '~/Pages/Book';
import BookingHistory from '~/Pages/BookingHistory';
import Contact from '~/Pages/Contact';
import Cart from '~/Pages/Cart';
import PersonalPage from '~/Pages/PersonalPage';

//no Login open
const publicRoutes = [
    //Logins
    { path: config.routes.login, component: Login, layout: null },
    //Register
    { path: config.routes.register, component: Register, layout: null },

    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product, layout: AddSidebarLayout },
    { path: config.routes.product_details, component: ProductDetail },
    { path: config.routes.book, component: Book },
    { path: config.routes.bookingHistory, component: BookingHistory },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.personalPage, component: PersonalPage },
];

//Login open
const privateRoutes = [];

export { publicRoutes, privateRoutes };
