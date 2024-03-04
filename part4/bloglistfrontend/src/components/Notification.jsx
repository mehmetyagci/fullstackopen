import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  console.log('notification', message, type);
  
  if (!message) {
    return null;
  }

  let className = '';
  switch (type) {
    case 'error':
      className = 'error';
      break;
    case 'warning':
      className = 'warning';
      break;
    case 'info':
      className = 'info';
      break;
    case 'success':
      className = 'success';
      break;
    default:
      className = '';
  }

  return (
    <div className={`${className}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

export default Notification;