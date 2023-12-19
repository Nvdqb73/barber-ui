const local = 'http://localhost:4000/';

const routes = {
    //Not Found
    error404: '*',
    local,

    //Login
    login: '/login',

    //Register
    register: '/register',

    //Client
    home: '/',
    product: '/product',
    product_details: '/product/:id',
    book: '/book',
    bookingHistory: '/bookingHistory',
    contact: '/contact',
    cart: '/cart',
    personalPage: '/personalPage',
};

export default routes;
