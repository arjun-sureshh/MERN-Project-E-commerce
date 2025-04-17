import React, { useState } from 'react';
import styles from './Orders.module.css';

// Define an interface for the order
interface OrderModel {
  id: number;
  product: string;
  color?: string;
  price: number;
  status: 'Delivered' | 'Cancelled';
  date: string;
  statusMessage: string;
}

const Orders: React.FC = () => {
  // Sample order data
  const [orders, setOrders] = useState<OrderModel[]>([
    {
      id: 1,
      product: 'Logitech B175 / Optical Tracking, 12-Mon...',
      color: 'Black',
      price: 499,
      status: 'Delivered',
      date: 'Dec 04, 2024',
      statusMessage: 'Your item has been delivered'
    },
    {
      id: 2,
      product: 'Logitech B175 / Optical Tracking, 12-Mon...',
      color: 'Black',
      price: 549,
      status: 'Cancelled',
      date: 'Dec 02, 2024',
      statusMessage: 'As per your request, your item has been cancelled'
    },
    {
      id: 3,
      product: 'Logitech B175 / Optical Tracking, 12-Mon...',
      color: 'Black',
      price: 609,
      status: 'Cancelled',
      date: 'Dec 02, 2024',
      statusMessage: 'As per your request, your item has been cancelled'
    },
    {
      id: 4,
      product: 'Jainsons Pet Products Water Aquarium Pum...',
      price: 650,
      status: 'Delivered',
      date: 'Nov 29, 2024',
      statusMessage: 'Your item has been delivered'
    }
  ]);

  // Filter states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string | null>(null);

  // Status filter options
  const statusOptions = ['On the way', 'Delivered', 'Cancelled', 'Returned'];

  // Time frame options
  const timeFrameOptions = ['Last 30 days', '2024', '2023', '2022', '2021', 'Older'];

  return (
    <div className={styles.container}>
      {/* Filters Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.filtersTitle}>Filters</h2>
        
        {/* Order Status Filters */}
        <div className={styles.orderStatus}>
          <h3 className={styles.filterSectionTitle}>ORDER STATUS</h3>
          {statusOptions.map(status => (
            <div key={status} className={styles.filterCheckbox}>
              <input 
                type="checkbox" 
                id={status} 
                className={styles.checkbox}
                checked={selectedStatuses.includes(status)}
                onChange={() => {
                  setSelectedStatuses(prev => 
                    prev.includes(status) 
                    ? prev.filter(s => s !== status)
                    : [...prev, status]
                  );
                }}
              />
              <label htmlFor={status} className={styles.checkboxLabel}>{status}</label>
            </div>
          ))}
        </div>

        {/* Order Time Filters */}
        <div className={styles.orderTime}>
          <h3 className={styles.filterSectionTitle}>ORDER TIME</h3>
          {timeFrameOptions.map(timeFrame => (
            <div key={timeFrame} className={styles.filterRadio}>
              <input 
                type="radio" 
                id={timeFrame} 
                name="timeFrame"
                className={styles.radio}
                checked={selectedTimeFrame === timeFrame}
                onChange={() => setSelectedTimeFrame(timeFrame)}
              />
              <label htmlFor={timeFrame} className={styles.radioLabel}>{timeFrame}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className={styles.ordersList}>
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search your orders here" 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            Search Orders
          </button>
        </div>

        {/* Order List */}
        {orders.map(order => (
          <div 
            key={order.id} 
            className={styles.orderItem}
          >
            <div className={styles.orderProductInfo}>
              {/* Placeholder for product image */}
              <div className={styles.productImagePlaceholder}></div>
              
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{order.product}</h3>
                {order.color && <p className={styles.productColor}>Color: {order.color}</p>}
              </div>
            </div>

            <div className={styles.orderStatusDetails}>
              <p className={styles.orderPrice}>₹{order.price}</p>
              <p className={`${styles.orderStatus} ${order.status === 'Delivered' ? styles.statusDelivered : styles.statusCancelled}`}>
                {order.status === 'Delivered' ? '● Delivered' : '● Cancelled'} on {order.date}
              </p>
              <p className={styles.statusMessage}>{order.statusMessage}</p>
              
              {order.status === 'Delivered' && (
                <button className={styles.reviewButton}>
                  Rate & Review Product
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;