import React from 'react';

function GoogleMap() {
    return (
        <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d582.499021071272!2d106.78117524900105!3d10.844127822846971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527ae249039bb%3A0xae94aa5bcc7e094b!2sBarberShop%20V%C5%A9%20Tr%C3%AD%2012!5e0!3m2!1svi!2s!4v1702568823194!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
        ></iframe>
    );
}

export default GoogleMap;
