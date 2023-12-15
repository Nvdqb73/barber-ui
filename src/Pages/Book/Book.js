import React, { useState, useEffect } from 'react';
import styles from './Book.module.scss';
// import jwt from 'jsonwebtoken';

import * as serviceServices from '~/services/serviceServices';
import * as employeeServices from '~/services/employeeServices';
import * as storeServices from '~/services/storeServices';
import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';

import { toast } from 'react-toastify';
import moment from 'moment';

const Book = () => {
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

    // const token = localStorage.getItem('token');

    // useEffect(() => {
    //     // Lấy token từ local storage hoặc nơi khác bạn lưu trữ
    //     const token = localStorage.getItem('yourTokenKey');

    //     if (token) {
    //         try {
    //             // Giải mã token và lấy thông tin
    //             const decodedToken = jwt.verify(token, 'yourSecretKey');
    //             // setUserInfo(decodedToken);
    //         } catch (error) {
    //             // Xử lý lỗi khi giải mã không thành công
    //             console.error('Error decoding token:', error);
    //         }
    //     }
    // }, []);

    // console.log('token nè', token);
    // const jwt = require('jsonwebtoken');

    // // Token từ backends
    // const tokenFromBackend = token;

    // // Mã bí mật (secret key) mà bạn đã sử dụng để ký token
    // const secretKey = 'DOANCHUYENNGANH2023';

    // try {
    //     // Giải mã token
    //     const decodedToken = jwt.verify(tokenFromBackend, secretKey);

    //     // decodedToken chứa thông tin giải mã từ token
    //     console.log(decodedToken);
    // } catch (error) {
    //     // Xử lý lỗi nếu token không hợp lệ hoặc đã hết hạn
    //     console.error('Error decoding token:', error.message);
    // }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await serviceServices.getService();
                // console.log('server', response);
                setServices(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await employeeServices.getEmployee();
                // console.log('Employee', response);
                setEmployees(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBookedTimes = async () => {
            try {
                const response = await bookServices.getBook();
                const startDate = response.map((Booking) => Booking.startDate);
                // console.log('forEach', startDate);
                setStartDate(startDate);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchStore = async () => {
            try {
                const response = await storeServices.getStore();
                // console.log('Store', response);
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

    const handleNameChange = (event) => {
        setName(event.target.value);
        setNameError('');
    };

    const handleGuestsChange = (event) => {
        const value = event.target.value;
        if (value >= 1) {
            setGuests(value);
        }
    };

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

        if (name.trim() === '') {
            toast.error('Vui lòng nhập họ tên');
            return;
        }

        try {
            const [startDates] = startDate;

            const employees = employee?.employeID;

            await bookServices.createBook(startDates, startTime, note, storeID, serID, employees);

            setStartDate('');
            setStartTime('');
            setNote('');
            setCustomerID('');
            setStore([]);
            setEmployee('');
            setServices([]);

            toast.success('success');
        } catch (error) {
            console.error(error);

            toast.error('failed');
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
        <div className={styles.bookingForm}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Họ tên:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} className={styles.inputField} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="store">Chi nhánh:</label>
                <select
                    id="store"
                    value={selectedStore?.storeID}
                    onChange={handleStoreChange}
                    className={styles.inputField}
                >
                    <option value="">-- Chọn chi nhánh --</option>
                    {store.map((store) => (
                        <option key={store.storeID} value={store.storeID}>
                            {store.storeName}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="employee">Thợ :</label>
                <select
                    id="employee"
                    value={employee?.employeID}
                    onChange={handleStylistChange}
                    className={styles.inputField}
                >
                    <option value="">-- Chọn thợ --</option>
                    {employees.map((employee) => (
                        <option key={employee.employeID} value={employee.employeID}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="service">Dịch vụ:</label>
                <select
                    id="service"
                    value={selectedService?.serID}
                    onChange={handleServiceChange}
                    className={styles.inputField}
                >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((service) => (
                        <option key={service.serID} value={service.serID}>
                            {service.serName} - {service.serPrice}₫
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date">Ngày:</label>
                <input
                    type="date"
                    id="date"
                    value={startDate}
                    onChange={handleDateChange}
                    min={moment().format('DD-MM-YYY')}
                    className={styles.inputField}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="time">Giờ:</label>
                <input
                    type="time"
                    id="time"
                    value={startTime}
                    onChange={handleTimeChange}
                    className={styles.inputField}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="notes">Ghi chú: </label>
                <textarea id="note" value={note} onChange={handleNoteChange} className={styles.inputField}></textarea>
            </div>

            <div className={styles.formGroup}>
                <button onClick={handleSubmit} className={styles.submitButton}>
                    Xác nhận đặt lịch
                </button>
            </div>
        </div>
    );
};

export default Book;
