const Notification = ({ notification }) => {
    console.log('notification', notification);
  
    if (!notification || !notification.message) {
      return null;
    }
  
    const { message, notificationType } = notification;
    
      let className = "";
      switch (notificationType) {
        case "error":
          className = "error";
          break;
        default:
          className = "success";
          break;
      }
    
      return (
        <div className={className}>
          {message}
        </div>
      );
    };
    
    export default Notification;
    