import React, { useState, useEffect } from 'react';
import styles from './Book.module.scss';
import axios from 'axios';

import * as serviceServices from '~/services/serviceServices';
import * as employeeServices from '~/services/employeeServices';
import * as storeServices from '~/services/storeServices';
import * as bookServices from '~/services/bookServices';
import * as customerService from '~/services/customerService';

import validator from 'validator';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import moment from 'moment';

const Book = () => {
    // const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [guests, setGuests] = useState('');
    // const [branch, setBranch] = useState('');
    const [branchs, setBranchs] = useState([]);
    const [stylist, setStylist] = useState('');
    const [stylists, setStylists] = useState([]);
    const [services, setServices] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');
    const [dv, setDV] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [maTCT, setMaTCT] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [bookedTimes, setBookedTimes] = useState([]);
    const [maCN, setMaCN] = useState('');
    const [cn, setCN] = useState('');
    const [selectedBranch, setSelectedBranch] = useState(null);

    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await serviceServices.getService();
                // console.log('data2', response);
                // setServices(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchStylists = async () => {
            try {
                const response = await employeeServices.getEmployee();
                // console.log('data3', response);

                // setStylists(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBookedTimes = async () => {
            try {
                const response = await bookServices.getBook();
                // console.log('data5', response);

                // const bookedTimes = response.data.map((lichHen) => lichHen.time);
                // setBookedTimes(bookedTimes);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBranchs = async () => {
            try {
                const response = await storeServices.getStore();
                // console.log('data4', response);
                // setBranchs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCustomer = async () => {
            try {
                const response = await customerService.getCustomer();
                // console.log('data6', response);
                // setBranchs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
        fetchStylists();
        fetchBookedTimes();
        fetchBranchs();
        fetchCustomer();
    }, []);

    // const handlePhoneChange = (event) => {
    //     setPhone(event.target.value);
    //     setPhoneError('');
    // };

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
        const selectedStylist = stylists.find((stylist) => stylist.employeID === selectedStylistId);
        setMaTCT(selectedStylistId);
        setStylist(selectedStylist);
    };

    const handleBranchChange = (event) => {
        const selectedBranchId = event.target.value;
        const selectedBranch = branchs.find((branch) => branch.storeID === selectedBranchId);
        setCN(selectedBranchId);
        setSelectedBranch(selectedBranch);
    };

    const handleServiceChange = (event) => {
        const selectedServiceId = event.target.value;
        const selectedService = services.find((service) => service.serID === selectedServiceId);
        setDV(selectedServiceId);
        setSelectedService(selectedService);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
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

        // if (!validator.isMobilePhone(phone, 'vi-VN')) {
        //     setPhoneError('Vui lòng nhập số điện thoại hợp lệ');
        //     return;
        // }

        if (name.trim() === '') {
            setNameError('Vui lòng nhập họ tên');
            return;
        }

        if (!isDateValid(date)) {
            setBookingStatus('Hãy chọn giờ hợp lệ');
            return;
        }

        const data = {
            // phone,
            name,
            customer_number: guests,
            // chonChiNhanh: maCN,
            chonTho: stylist,
            date,
            time,
            ghiChu: note,
            maDV: dv,
            maTCT,
            maCN: cn,
        };

        try {
            const response = await bookServices(data);
            // console.log('abc', response.data);

            // setPhone('');
            setName('');
            setGuests('');
            setBranchs([]);
            setStylist('');
            setServices([]);
            setDate('');
            setTime('');
            setNote('');

            setBookingStatus('success');
        } catch (error) {
            console.error(error);

            setBookingStatus('failed');
        }
    };

    const renderBookingStatus = () => {
        if (bookingStatus === 'success') {
            return <p>Đặt lịch thành công!</p>;
        } else if (bookingStatus === 'failed') {
            return <p>Đặt lịch thất bại. Vui lòng nhập đủ thông tin!</p>;
        } else {
            return null;
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

    const renderBranchs = () => {
        return (
            <div>
                <label htmlFor="branch">Chi nhánh:</label>
                <select id="branch" value={selectedBranch?.storeID} onChange={handleBranchChange}>
                    <option value="">-- Chọn chi nhánh --</option>
                    {branchs.map((branch) => (
                        <option key={branch.storeID} value={branch.storeID}>
                            {branch.storeName}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className={styles.bookingForm}>
            {/* <h1>Đặt lịch</h1> */}
            {/* <div className={styles.formGroup}>
                <label htmlFor="phone">Số điện thoại:</label>
                <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} className={styles.inputField} />
            </div> */}

            <div className={styles.formGroup}>
                <label htmlFor="name">Họ tên:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} className={styles.inputField} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="people">Số người:</label>
                <input
                    type="number"
                    id="guests"
                    value={guests}
                    onChange={handleGuestsChange}
                    min="1"
                    className={styles.inputField}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="branch">Chi nhánh:</label>
                <select
                    id="branch"
                    value={selectedBranch?.serID}
                    onChange={handleBranchChange}
                    className={styles.inputField}
                >
                    <option value="">-- Chọn chi nhánh --</option>
                    {branchs.map((branch) => (
                        <option key={branch.storeID} value={branch.storeID}>
                            {branch.storeName}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="barber">Thợ :</label>
                <select id="stylist" value={stylist} onChange={handleStylistChange} className={styles.inputField}>
                    <option value="">-- Chọn thợ --</option>
                    {stylists.map((stylist) => (
                        <option key={stylist.employeID} value={stylist.employeID}>
                            {stylist.firstName}
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
                    value={date}
                    onChange={handleDateChange}
                    min={moment().format('DD-MM-YYY')}
                    className={styles.inputField}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="time">Giờ:</label>
                <input type="time" id="time" value={time} onChange={handleTimeChange} className={styles.inputField} />
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

            {/* {phoneError && <p className="error-message">{phoneError}</p>} */}
            {nameError && <p className="error-message">{nameError}</p>}

            {renderBookingStatus()}
        </div>
    );
};

export default Book;
