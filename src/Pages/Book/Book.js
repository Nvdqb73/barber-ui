import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import moment from 'moment';

import * as serviceServices from '~/services/serviceServices';
import * as employeeServices from '~/services/employeeServices';
import * as storeServices from '~/services/storeServices';
import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';
import styles from './Book.module.scss';
import BookingForm from '~/components/feature/BookingForm';
import BookingWarning from '~/components/common/BookingWarning';

const cx = classNames.bind(styles);
const Book = () => {
    const [currentUser, setCurrentUser] = useState(false);
    const [userID, setUserID] = useState(null);
    const [customerItem, setCustomerItem] = useState('');
    const [store, setStore] = useState([]);
    const [employee, setEmployee] = useState('');
    const [employees, setEmployees] = useState([]);
    const [services, setServices] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [note, setNote] = useState('');
    const [serID, setSerID] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [storeID, setStoreID] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                setCurrentUser(true);
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (error) {
                setCurrentUser(false);
                console.error('Bạn chưa đặng nhập:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await serviceServices.getService();
                if (response) {
                    setServices(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await employeeServices.getEmployee();
                if (response) {
                    setEmployees(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBookedTimes = async () => {
            try {
                const response = await bookServices.getBook();
                if (response) {
                    const startDate = response.map((Booking) => Booking.startDate);

                    setStartDate(startDate);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchStore = async () => {
            try {
                const response = await storeServices.getStore();
                if (response) {
                    setStore(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
        fetchEmployees();
        fetchBookedTimes();
        fetchStore();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await customerService.getCustomer();
                const customer = response.find((item) => item?.userID === userID);
                if (customer) {
                    setCustomerItem(customer);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [userID]);

    const handleStylistChange = (event) => {
        const selectedStylistId = event.target.value;
        const selectedStylist = employees.find((employee) => employee?.employeeID === parseInt(selectedStylistId));
        setEmployee(selectedStylist);
    };

    const handleStoreChange = (event) => {
        const selectedStoreId = event.target.value;
        const selectedStore = store.find((store) => store.storeID === parseInt(selectedStoreId));
        setStoreID(selectedStoreId);
        setSelectedStore(selectedStore);
    };
    const handleServiceChange = (event) => {
        const selectedServiceId = event.target.value;
        const selectedService = services.find((service) => service.serID === parseInt(selectedServiceId));
        setSerID(selectedServiceId);
        setSelectedService(selectedService);
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const check = isDateValid(selectedDate);
        if (!check) {
            setStartDate('');
            toast.error('Thời gian không hợp lệ. Vui lòng chọn lại.');
        } else {
            setStartDate(selectedDate);
        }
    };

    const handleTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const isDateValid = (selectedDate) => {
        const currentDate = moment().startOf('day');
        const selected = moment(selectedDate, 'YYYY-MM-DD').startOf('day');
        return selected.isAfter(currentDate);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const employeeID = employee?.employeeID;
        const serID = selectedService?.serID;
        const customerID = customerItem?.customerID;

        if (customerID) {
            const startTimeNew = startTime + ':00';
            const booking = await bookServices.createBook(startDate, startTimeNew, note, customerID, storeID);
            if (booking) {
                const bookingService = await bookServices.createBookService(booking?.bookingID, serID, employeeID);
                if (bookingService) {
                    toast.success('Đặt lịch thành công!');
                }
                return;
            } else {
                toast.error('Đặt lịch thất bại vui lòng thử lại!');
            }
        }

        setStartDate('');
        setStartTime('');
        setNote('');
    };

    return (
        <div className={cx('wrapper')}>
            {currentUser ? (
                <BookingForm
                    customerItem={customerItem}
                    selectedStore={selectedStore}
                    store={store}
                    employee={employee}
                    employees={employees}
                    selectedService={selectedService}
                    services={services}
                    startDate={startDate}
                    startTime={startTime}
                    note={note}
                    storeID={storeID}
                    handleStoreChange={handleStoreChange}
                    handleStylistChange={handleStylistChange}
                    handleServiceChange={handleServiceChange}
                    handleDateChange={handleDateChange}
                    handleTimeChange={handleTimeChange}
                    handleNoteChange={handleNoteChange}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <BookingWarning title="Vui lòng đăng nhập trước khi đặt lịch" />
            )}
        </div>
    );
};

export default Book;
