import React from 'react';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

const reCAPTCHA_site_key = '6LfpLcQqAAAAAINkLVY3XzdyWm9GQlQAJ0bPt-H2';
//console.log('reCAPTCHA_site_key:', reCAPTCHA_site_key);

root.render(
  <GoogleReCaptchaProvider reCaptchaKey={reCAPTCHA_site_key}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleReCaptchaProvider>
);