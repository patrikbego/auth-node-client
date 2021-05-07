export const GA_TRACKING_ID = 'G-2RXKF10PRH'; // TODO export from process.env.GA_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url, trackingId = GA_TRACKING_ID) => {
  window.gtag('config', trackingId, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action, category, label, value,
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
