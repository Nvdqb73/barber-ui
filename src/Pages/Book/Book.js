import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import moment from 'moment';
import styles from './Book.module.scss';

import * as serviceServices from '~/services/serviceServices';
import * as employeeServices from '~/services/employeeServices';
import * as storeServices from '~/services/storeServices';
import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';

const cx = classNames.bind(styles);
const Book = () => {
    const [userID, setUserID] = useState(null);
    const [customerItem, setCustomerItem] = useState('');
    const [name, setName] = useState('');
    const [guests, setGuests] = useState('');
    const [store, setStore] = useState([]);
    const [employee, setEmployee] = useState('');
    const [employees, setEmployees] = useState([]);
    const [services, setServices] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [note, setNote] = useState('');
    const [serID, setSerID] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [employeeID, setEmployeeID] = useState('');
    const [nameError, setNameError] = useState('');
    const [storeID, setStoreID] = useState('');
    const [customerID, setCustomerID] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (error) {
                console.error('Token không tồn tại:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await serviceServices.getService();

                setServices(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await employeeServices.getEmployee();

                setEmployees(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBookedTimes = async () => {
            try {
                const response = await bookServices.getBook();
                const startDate = response.map((Booking) => Booking.startDate);

                setStartDate(startDate);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchStore = async () => {
            try {
                const response = await storeServices.getStore();

                setStore(response);
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
        const selectedStylist = employees.find((employee) => employee.employeID == selectedStylistId);
        setEmployeeID(selectedStylistId);
        setEmployee(selectedStylist);
    };

    const handleStoreChange = (event) => {
        const selectedStoreId = event.target.value;
        const selectedStore = store.find((store) => store.storeID == selectedStoreId);
        setStoreID(selectedStoreId);
        setSelectedStore(selectedStore);
    };
    const handleServiceChange = (event) => {
        const selectedServiceId = event.target.value;
        const selectedService = services.find((service) => service.serID == selectedServiceId);
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
        try {
            const [startDates] = startDate;

            const employees = employee?.employeID;

            const customerID = customerItem?.customerID;

            if (employees && customerID) {
                await bookServices.createBook(startDates, startTime, note, customerID, storeID, serID, employees);
            }

            setStartDate('');
            setStartTime('');
            setNote('');
            setCustomerID('');
            setStore([]);
            setEmployee('');
            setServices([]);

            toast.success('Đặt lịch thành công');
        } catch (error) {
            console.error(error);

            toast.error('Đặt lịch thất bại vui lòng thử lại!');
        }
    };

    const renderServices = () => {
        return (
            <div>
                <label htmlFor="service">Dịch vụ:</label>
                <select id="service" value={selectedService?.serID} onChange={handleServiceChange}>
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((service) => (
                        <option key={service.serID} value={service.serID}>
                            {service.serName} - {service.serPrice}đ
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const renderStores = () => {
        return (
            <div>
                <label htmlFor="store">Chi nhánh:</label>
                <select id="store" value={selectedStore?.storeID} onChange={handleStoreChange}>
                    <option value="">-- Chọn chi nhánh --</option>
                    {store.map((store) => (
                        <option key={store.storeID} value={store.storeID}>
                            {store.storeName}
                        </option>
                    ))}
                </select>
            </div>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bookingForm')}>
                <div className={cx('formGroup')}>
                    <label>Họ tên:</label>
                    <span>{`${customerItem?.firstName} ${customerItem?.lastName}`}</span>
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="store">Chi nhánh:</label>
                    <select
                        id="store"
                        value={selectedStore?.storeID}
                        onChange={handleStoreChange}
                        className={cx('inputField')}
                    >
                        <option value="">-- Chọn chi nhánh --</option>
                        {store.map((store) => (
                            <option key={store.storeID} value={store.storeID}>
                                {store.storeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="employee">Thợ :</label>
                    <select
                        id="employee"
                        value={employee?.employeID}
                        onChange={handleStylistChange}
                        className={cx('inputField')}
                    >
                        <option value="">-- Chọn thợ --</option>
                        {employees.map((employee) => (
                            <option key={employee.employeID} value={employee.employeID}>
                                {employee.firstName} {employee.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="service">Dịch vụ:</label>
                    <select
                        id="service"
                        value={selectedService?.serID}
                        onChange={handleServiceChange}
                        className={cx('inputField')}
                    >
                        <option value="">-- Chọn dịch vụ --</option>
                        {services.map((service) => (
                            <option key={service.serID} value={service.serID}>
                                {service.serName} - {service.serPrice}₫
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="date">Ngày:</label>
                    <input
                        type="date"
                        id="date"
                        value={startDate}
                        onChange={handleDateChange}
                        min={moment().format('DD-MM-YYY')}
                        className={cx('inputField')}
                    />
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="time">Giờ:</label>
                    <input
                        type="time"
                        id="time"
                        value={startTime}
                        onChange={handleTimeChange}
                        className={cx('inputField')}
                    />
                </div>

                <div className={cx('formGroup')}>
                    <label htmlFor="notes">Ghi chú: </label>
                    <textarea
                        id="note"
                        value={note}
                        onChange={handleNoteChange}
                        className={cx('inputField')}
                    ></textarea>
                </div>
            </div>
            <div className={cx('btn-submit')}>
                <button onClick={handleSubmit} className={cx('submitButton')}>
                    Xác nhận đặt lịch
                </button>
            </div>
        </div>
    );
};

export default Book;
