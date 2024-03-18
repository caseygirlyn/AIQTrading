import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../common/Header';
import Footer from '../common/Footer';

function Contact() {
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode(true));
    function getInitialMode() {
        const savedMode = JSON.parse(localStorage.getItem('darkMode'));
        return savedMode || false; // If no saved mode, default to light mode
    }

    // Function to toggle between dark and light mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const form = useRef();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear validation error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form
        const validationErrors = {};
        if (!formData.firstName.trim()) {
            validationErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            validationErrors.lastName = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) {
            validationErrors.message = 'Message is required';
        }
        if (Object.keys(validationErrors).length === 0) {
            // Form submission logic here
            console.log('Form submitted:', formData);
            // Clear form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            });

            emailjs
                .sendForm('service_6audjoo', 'template_pwm4hsi', form.current, {
                    publicKey: '5K0Sgk3FJ5gbGtO1S',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    },
                );

            setSubmitted(true);
            // Reset submission status after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);

        } else {
            setErrors(validationErrors);
        }
    };

    return <div className={isDarkMode ? 'darkMode' : 'lightMode'} >
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                id="darkModeSwitch"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
                {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars-fill"></i>}
            </label>
        </div>
        <Header />
        <div className="container content px-4">
            <section className="row pt-5 mt-5">
                <div className='banner mt-3 mb-5 p-md-5 p-3 d-grid shadow'>
                    <h2 className="w-auto d-flex align-items-center text-white">Contact Us</h2>
                    <h3 className='fs-6 mb-4 text-white'>Want to get in touch? Our experienced customer service team would love to hear from you.</h3>
                </div>

                {submitted ? (
                    <div className='px-2'><div className="alert alert-success" role="alert">
                        Thank you for your message! Our team will get back to you shortly.
                    </div></div>
                ) : ''}

                <form ref={form} className="needs-validation p-2 p-md-2" noValidate onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="form-floating mb-3">
                                <input type="text" id="floatingFirstName" placeholder="" name="firstName" required value={formData.firstName} onChange={handleChange} className={`bg-white text-dark form-control ${errors.firstName && 'is-invalid'}`} />
                                <label htmlFor="floatingFirstName" className="ms-1 px-2 text-dark">First Name</label>
                                {errors.firstName && <span className="text-danger ps-1">{errors.firstName}</span>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" id="floatingLastName" placeholder="" name="lastName" required value={formData.lastName} onChange={handleChange} className={`bg-white form-control text-dark ${errors.lastName && 'is-invalid'}`} />
                                <label htmlFor="floatingLastName" className="ms-1 px-2 text-dark">Last Name</label>
                                {errors.lastName && <span className="text-danger ps-1">{errors.lastName}</span>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" id="floatingEmail" placeholder="name@example.com" name="email" required value={formData.email} onChange={handleChange} className={`bg-white form-control text-dark ${errors.email && 'is-invalid'}`} />
                                <label htmlFor="floatingEmail" className="ms-1 px-2 text-dark">Email address</label>
                                {errors.email && <span className="text-danger ps-1">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-floating mb-3">
                                <textarea placeholder="Message" id="floatingMessage" name="message" value={formData.message} onChange={handleChange} className={`bg-white form-control text-dark text-dark ${errors.message && 'is-invalid'}`}></textarea>
                                <label htmlFor="floatingMessage" className="ms-1 px-2 text-dark ">Message</label>
                                {errors.message && <span className="text-danger ps-1">{errors.message}</span>}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-secondary bg-secondary-color w-100 p-3 border-0 mb-2">Submit form</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        <Footer />
    </div>
}

export default Contact