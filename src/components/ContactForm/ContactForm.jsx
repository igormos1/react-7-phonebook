import { useState} from "react";
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './ContactForm.module.css';
import {
    useCreateContactMutation,
    useFetchContactsQuery
} from '../../redux/contacts/contactsSlice';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const { data: contacts } = useFetchContactsQuery();
    const [createContact, {isLoading}] = useCreateContactMutation();
    
    const onHandleChange = (event) => {
      
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const  onHandleSubmit =  event => {
        event.preventDefault();
        
        reset(); 
         if (contacts.find(contact => contact.name === name)) {
             Notify.failure(`${name} is already in contacts`);
        return
        }
        else {
             createContact({ name, number })
             Notify.success(`Нou added ${name} to your Contact book!`)
        }
        
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={s.form}
            onSubmit={onHandleSubmit}
        >
            <label className={s.name}> 
                Name
                <input
                    className={s.nameContact}
                    onChange={onHandleChange}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={s.name}>
                Number
                <input
                    className={s.nameContact}
                    onChange={onHandleChange}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={s.button} type="submit">{isLoading ? 'Adding...' : 'Add contact'}</button>
        </form>
    )
};

export default ContactForm;

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    contacts: PropTypes.array
};
