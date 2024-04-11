import classNames from 'classnames/bind';
import styles from './BookHistoryForm.module.scss';
import Table from 'react-bootstrap/Table';

const cx = classNames.bind(styles);

function BookHistoryForm({ ...props }) {
    const { bookings, stores, services, employees } = props;

    return (
        <div className={cx('wrapper')}>
            <Table striped>
                <thead>
                    <tr>
                        <th>Mã đặt</th>
                        <th>Ngày đặt</th>
                        <th>Thời gian</th>
                        <th>Cửa hàng</th>
                        {/* <th>Dịch vụ</th> */}
                        <th>Tên thợ</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingID}>
                            <td>{booking.bookingID}</td>
                            <td>{booking.startDate}</td>
                            <td>{booking.startTime}</td>
                            <td>{stores?.find((store) => store?.storeID === booking?.storeID)?.storeName}</td>
                            {/* <td>{services?.find((service) => service?.serID === booking?.serID)?.serName}</td> */}
                            <td>
                                {employees
                                    ?.find((employee) => employee?.employeID === booking?.employeID)
                                    .firstName.concat(
                                        ' ',
                                        employees?.find((employee) => employee?.employeID === booking?.employeID)
                                            .lastName,
                                    )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default BookHistoryForm;
