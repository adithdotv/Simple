import React, { useState } from 'react';

function PasswordModal({ onClose, onSubmit, title }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (title === 'Create Wallet Password' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    onSubmit(password);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        {title === 'Create Wallet Password' && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        )}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-full font-semibold shadow-md hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
