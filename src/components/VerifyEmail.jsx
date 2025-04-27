import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../api/api'; // axios instance
import '../App.css'
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying...');
  const [messageType, setMessageType] = useState(''); // Track success/error
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setMessage('Invalid verification link.');
        return;
      }

      try {
        const res = await API.get(`/auth/verify?token=${token}`);
        console.log(res);
        setMessage('Email verified successfully! You can now login.');
        setMessageType('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect to login after 2 seconds
      } catch (err) {
        console.error(err.message);
        setMessage('Verification failed or link expired.');
        setMessageType('error');
        setTimeout(() => {
            navigate('/register');
          }, 3000);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2 className={messageType === 'error' ? 'verify-error' : 'verify-success'}>
          {message}
        </h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
