import styled from "styled-components";

export const PaymentPageWrapper = styled.div`
  .payment-container {
    width: 500px;
    margin: 30px auto;
    padding: 20px;
    text-align: center;
    /* border: 1px solid #ccc; */
    /* border-radius: 20px; */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .payment-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .payment-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .payment-button:hover:not(:disabled) {
    background-color: #45a049;
  }

  p {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
`;
