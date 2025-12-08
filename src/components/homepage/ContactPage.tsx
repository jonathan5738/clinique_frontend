import "./ContactPage.css"
import Phone from "../../assets/img/fi-rr-phone-call (1).svg";
import LocationIcon from "../../assets/img/fi-rr-marker.svg";
import SocialMediaIcon from "../../assets/img/Vector.svg";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { useAddNewMessageMutation } from "../../api";

interface ContactFields {
    prenom: string;
    lastName: string
    email: string;
    reason: string;
    message: string;
}
const contactSchema = z.object({
    prenom: z.string()
      .min(2, "Veuillez entrer votre prenom s'il vous plait")
      .max(30, "Veuillez entrer un prenom moins long"),
    reason: z.string("Veuillez entrer la raison de votre message")
        .min(10, "Veuillez entrer la raison de votre message"),
    email: z.email("Veuillez entrer votre email"),
    lastName: z.string().min(2, "Veuillez entrer votre nom de famille"),
    message: z.string()
        .min(10, "Veuillez nous décrire plus en détail votre besoin."),
})
function ContactPage (){
    const { register, handleSubmit, formState: {errors}} = useForm<ContactFields>({
        resolver: zodResolver(contactSchema)
    });
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(true);
    const [addNewMessage] = useAddNewMessageMutation();
    const onSubmit: SubmitHandler<ContactFields> = (data) => {
        if(!phoneNumber){
            setIsPhoneNumber(false)
        } else {
            const {prenom, lastName, email, reason, message} = data;
            const formData = {
                firstName: prenom,
                lastName, 
                title: reason,
                content: message,
                phoneNumber,
                emailAddress: email
            };
            addNewMessage(formData);
        }
    }
    return (
        <div>
          <div className="contact-container">
            <div className="contact-text">
             <h3 className="contact-title">Contactez nous</h3>
             <p>Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos démarches de santé.
                 Que ce soit pour prendre rendez-vous, obtenir des informations sur nos services ,
                 n’hésitez pas à nous contacter. Nous serons ravis de vous aider.</p>
            </div>

             </div>

             <div className="contact-form-container">
                 <div className="contact-form-info">
                    <p>D’autres façons de nous joindre</p>
                    <div className="contact-form-info-item">
                        <img src={Phone} alt="phone icon" />
                        <ul className="phone-numbers">
                            <li><a href="tel:+242 06 764 21 44">+242 06 764 21 44 </a></li>
                            <li><a href="tel:+242 05 530 06 92">+242 05 530 06 92</a></li>
                            <li><a href="tel:+242 06 535 72 70">+242 06 535 72 70</a></li>
                        </ul>
                    </div>

                    <div className="contact-form-info-item">
                        <img src={LocationIcon} alt="map marker icon"/>
                        <p>Vers le carrefour lycee poaty bernard, Pointe noire, Congo  </p>
                    </div>

                    <div className="contact-form-info-item">
                        <img src={SocialMediaIcon} alt="facebook logo"/>
                        <p>PolycliniqueME</p>
                    </div>
                 </div>

                 <div>
                    <form className="message-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="personal-fields">
                            <div>
                                <input type="text" placeholder="Prenom" {...register("prenom")} />
                                {errors.prenom && <span className="event-form-error">{errors.prenom.message}</span>}
                            </div>
                            <div>
                                <input type="email" placeholder="Votre email" {...register("email")}/>
                                {errors.email && <span className="event-form-error">{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className="additional-message-fields">
                            <div className="additional-message-div">
                                <input type="text" className="lastname-field" placeholder="Nom de famille" {...register("lastName")} />
                                {errors.lastName && <span className="event-form-error">{errors.lastName.message}</span>}
                            </div>
                            <div className="additional-message-div">
                            <PhoneInput className="phone-number-input"
                              defaultCountry="CG"
                              placeholder="Numéro de téléphone" 
                            value={phoneNumber} onChange={(e) => {
                                setPhoneNumber(e);
                                setIsPhoneNumber(true);
                            }} />
                            {!isPhoneNumber && <span className="event-form-error">Veuillez entrer votre numéro de téléphone</span>}
                           </div>
                        </div>
                        <div className="message-reason">
                            <input type="text" placeholder="Raison de votre message" {...register("reason")} />
                            {errors.reason && <span className="event-form-error">{errors.reason.message}</span>}
                        </div>
                        
                        <div>
                            <textarea className="message-field" placeholder="Ecrivez votre message si dessous" {...register("message")}></textarea>
                            {errors.message && <span className="event-form-error">{errors.message.message}</span>}
                        </div>
            
                    <button className="message-button">Envoyez votre message</button>
                    </form>
                 </div>

             </div>
        </div>
    )
}
export default ContactPage;