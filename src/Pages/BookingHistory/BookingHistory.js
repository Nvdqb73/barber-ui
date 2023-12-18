import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';

import styles from './BookingHistory.module.scss';
import { useEffect, useState } from 'react';
import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';
import * as storeServices from '~/services/storeServices';
import * as serviceServices from '~/services/serviceServices';
import * as employeeServices from '~/services/employeeServices';
import BookHistoryForm from '~/components/feature/BookHistoryForm';
import BookingWarning from '~/components/common/BookingWarning';

const cx = classNames.bind(styles);

function BookingHistory() {
    const [currentUser, setCurrentUser] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [userID, setUserID] = useState(null);
    const [customerID, setCustomerID] = useState(null);
    const [stores, setStores] = useState([]);
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                setCurrentUser(true);
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (error) {
                setCurrentUser(false);
                console.error('Token không tồn tại:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await customerService.getCustomer();
                const customer = response.find((item) => item?.userID === userID);
                if (customer) {
                    setCustomerID(customer?.customerID);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [userID]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await bookServices.getBook();
            if (result) {
                const books = result.filter((book) => book.customerID === customerID);
                if (books) {
                    setBookings(books);
                }
            }
        };

        fetchApi();
    }, [customerID]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await storeServices.getStore();
            if (result) {
                setStores(result);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await serviceServices.getService();
            if (result) {
                setServices(result);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await employeeServices.getEmployee();
            if (result) {
                setEmployees(result);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {currentUser ? (
                <BookHistoryForm bookings={bookings} stores={stores} services={services} employees={employees} />
            ) : (
                <BookingWarning title="Vui lòng đăng nhập trước khi xem lịch" />
            )}
        </div>
    );
}

export default BookingHistory;
