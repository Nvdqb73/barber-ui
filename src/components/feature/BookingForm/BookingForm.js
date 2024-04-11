import classNames from 'classnames/bind';
import styles from './BookingForm.module.scss';
import moment from 'moment';
const cx = classNames.bind(styles);

function BookingForm({ ...props }) {
    const {
        customerItem,
        selectedStore,
        store,
        employee,
        employees,
        selectedService,
        services,
        startDate,
        startTime,
        note,
        storeID,
        handleStoreChange,
        handleStylistChange,
        handleServiceChange,
        handleDateChange,
        handleTimeChange,
        handleNoteChange,
        handleSubmit,
    } = props;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bookingForm')}>
                <div className={cx('formGroup')}>
                    <label>Họ tên:</label>
                    <span>
                        {customerItem?.firstName === undefined && customerItem?.lastName === undefined
                            ? null
                            : customerItem?.firstName.concat(' ', customerItem?.lastName)}
                    </span>
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
                        {storeID &&
                            employees
                                .filter((employee) => employee?.storeID === parseInt(storeID))
                                .map((employee) => (
                                    <option key={employee.employeeID} value={employee.employeeID}>
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
}

export default BookingForm;
