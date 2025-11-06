function ReceiptModal({ receipt, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>🧾 Receipt</h2>
                <p><strong>Name:</strong> {receipt.name}</p>
                <p><strong>Email:</strong> {receipt.email}</p>
                <p><strong>Total:</strong> ₹{receipt.total}</p>
                <p><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default ReceiptModal;
