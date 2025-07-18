import React from 'react';
import './Payments.css';

const Payments = ({ payments }) => {
  return (
    <div className="payments">
      <h1>Payment Management</h1>
      <div className="payment-stats">
        <div className="stat-card">
          <h3>$12,450</h3>
          <p>Total Revenue</p>
        </div>
        <div className="stat-card">
          <h3>156</h3>
          <p>Completed Payments</p>
        </div>
        <div className="stat-card">
          <h3>12</h3>
          <p>Pending Payments</p>
        </div>
      </div>

      <div className="payments-table">
        <table>
          <thead>
            <tr>
              <th>Listing</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.listing}</td>
                <td>${payment.amount}</td>
                <td>{payment.date}</td>
                <td>
                  <span className={`status ${payment.status}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;