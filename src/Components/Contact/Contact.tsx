import './Contact.css';


/**
 * A simple contact form
*/
export default function ContactForm() {
    return (
        <div className="contactFormContainer">
            <h2 className="contactFormHeading">Contactez-nous</h2>
            <form className="contactForm">
                <div className="inputGroup">
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" placeholder="Votre nom" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Votre email" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="subject">Sujet</label>
                    <input type="text" id="subject" placeholder="Sujet de votre message" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Votre message"></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};
