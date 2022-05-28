import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { useFetchContactsQuery, useDeleteContactsMutation }  from '../../redux/contacts/contactsSlice';
import s from './ContactList.module.css';


const ContactList = () => {
    const filter = (state) => state.contacts.filter;
    const { data: contacts } = useFetchContactsQuery();
    const [deleteContact] = useDeleteContactsMutation();

    const getFilter = useSelector(filter);
    const getFilteredContacts = (contacts) =>
        contacts?.filter((contact) =>
        contact.name.toLowerCase().includes(getFilter.toLowerCase())
        );

    const filterContacts = getFilteredContacts(contacts);

    const delContact = (id) => {
        deleteContact(id)
        Notify.success(`This contact has been deleted from the Contacts Book!`)
    }

    return (
        <>
            {contacts && 
            <ul className={s.list}>
                {filterContacts && 
                    filterContacts.map(({ id, name, phone }) => (
                    <li className={s.item} key={id}>
                        {name}:
                        <span className={s.number}>{phone}</span>
                        <button className={s.button} onClick={()=> delContact(id)} >Delete</button>
                    </li>))}
            </ul>
  
        }
        </>
        

    );
    
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func,
};