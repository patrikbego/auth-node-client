import { Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import utilStyles from '../styles/utils.module.css';
import { getCookie, setCookie } from '../api/cookieUtils';

export default function PrivacyPopup({ props }) {
  const [state, setState] = useState({
    // open: true,
  });

  useEffect(() => {
    // Update the document title using the browser API
    const ppSeen = getCookie('op_pp_seen');
    console.log('1.', ppSeen);
    if (ppSeen === 'false') {
      console.log('2.', state.open);
      setState({ ...state, open: true });
    }
    console.log('3.', !getCookie('op_pp_seen'));
  }, [state.open]);

  const handleClose = () => {
    setCookie('op_pp_seen', true, 365);
    setState({ ...state, open: false });
  };

  const policyLink = (
    <>
      <p>
        <Link href="/op/privacyAndCookiePolicy" variant="body2">
          <a className={utilStyles.a}>Privacy and Cookie Policy</a>
        </Link>
      </p>
    </>
  );

  const policyMessage = 'We use cookies to give you the best online experience. By using OctoPlasm, you agree to our ';

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={(
          <>
            {policyMessage}
            {policyLink}
          </>
          )}
        action={(
          <Button color="inherit" size="small" onClick={handleClose}>
            Close
          </Button>
        )}
        // action={(
        //     <>
        //       <IconButton
        //           size="small"
        //           aria-label="close"
        //           color="default"
        //           onClick={handleClose}
        //       >
        //         <CloseIcon />
        //       </IconButton>
        //     </>
        // )}
      />
    </>
  );
}
