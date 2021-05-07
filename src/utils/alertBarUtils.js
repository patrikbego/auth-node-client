const alertBarUtils = {
  openAlertBar(dispatch, statusText, type) {
    dispatch({
      type: 'SET_ALERT_MESSAGE',
      alertMessage: statusText,
    });
    dispatch({
      type: 'SET_ALERT_TYPE',
      alertType: type,
    });
    dispatch({
      type: 'SET_ALERT_OPEN',
      alertOpen: true,
    });
  },
};

module.exports = alertBarUtils;
