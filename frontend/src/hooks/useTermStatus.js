import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook để kiểm tra trạng thái học kỳ (mở/đóng)
 * @param {string} term - Mã học kỳ
 * @returns {object} { isTermActive, loading, error }
 */
const useTermStatus = (term) => {
  const [isTermActive, setIsTermActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    const fetchTermStatus = async () => {
      if (!term) {
        setIsTermActive(true);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE}/api/terms/${term}/status`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token || ""}`
          }
        });
        
        setIsTermActive(response?.data?.isActive !== undefined ? response.data.isActive : true);
      } catch (err) {
        console.error('Lỗi khi lấy trạng thái học kỳ:', err);
        setError(err.message);
        setIsTermActive(true); // Mặc định là active nếu có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchTermStatus();
  }, [term, API_BASE]);

  return { isTermActive, loading, error };
};

export default useTermStatus;
