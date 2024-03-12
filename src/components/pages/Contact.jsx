import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
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
                .sendForm('service_eceyvpd', 'template_xxdiukp', form.current, {
                    publicKey: '9SvmKJ6FtI7Rn-Ide',
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

    return <div className="container content my-3 py-1">
        <section className="row p-3 border-1 mx-4 my-5">
            <h2 className="primary-color w-auto bg-white d-flex align-items-center">Contact Us</h2>

            {submitted ? (
                <div className='px-2'><div className="alert alert-success" role="alert">
                    Thank you for your message! Our team will get back to you shortly.
                </div></div>
            ) : ''}

            <form ref={form} className="needs-validation p-0 p-md-2" noValidate onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-floating mb-3">
                            <input type="text" id="floatingFirstName" placeholder="" name="firstName" required value={formData.firstName} onChange={handleChange} className={`form-control ${errors.firstName && 'is-invalid'}`} />
                            <label htmlFor="floatingFirstName" className="ms-1 px-2">First Name</label>
                            {errors.firstName && <span className="text-danger ps-1">{errors.firstName}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" id="floatingLastName" placeholder="" name="lastName" required value={formData.lastName} onChange={handleChange} className={`form-control ${errors.lastName && 'is-invalid'}`} />
                            <label htmlFor="floatingLastName" className="ms-1 px-2">Last Name</label>
                            {errors.lastName && <span className="text-danger ps-1">{errors.lastName}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" id="floatingEmail" placeholder="name@example.com" name="email" required value={formData.email} onChange={handleChange} className={`form-control ${errors.email && 'is-invalid'}`} />
                            <label htmlFor="floatingEmail" className="ms-1 px-2">Email address</label>
                            {errors.email && <span className="text-danger ps-1">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-floating mb-3">
                            <textarea placeholder="Message" id="floatingMessage" name="message" value={formData.message} onChange={handleChange} className={`form-control ${errors.message && 'is-invalid'}`}></textarea>
                            <label htmlFor="floatingMessage" className="ms-1 px-2">Message</label>
                            {errors.message && <span className="text-danger ps-1">{errors.message}</span>}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-secondary bg-primary-color w-100 p-3 border-0 mb-2">Submit form</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
}