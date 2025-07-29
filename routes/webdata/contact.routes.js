import {Router} from 'express';
import { 
    createContact, 
    deleteContactById, 
    getContactById, 
    getContacts, 
    updateContactById,
    getContactsByStatus,
    getUnreadContacts,
    markContactAsRead,
    updateContactStatus
} from '../../controllers/webdata/contactController.js';

const ContactRouter = Router();

ContactRouter.post('/addcontact', createContact)

ContactRouter.get('/getcontacts', getContacts)

ContactRouter.get('/getcontactbyid/:id', getContactById)

ContactRouter.get('/getcontactsbystatus/:status', getContactsByStatus)

ContactRouter.get('/getunreadcontacts', getUnreadContacts)

ContactRouter.put('/updatecontact/:id', updateContactById)

ContactRouter.put('/markcontactasread/:id', markContactAsRead)

ContactRouter.put('/updatecontactstatus/:id', updateContactStatus)

ContactRouter.delete('/deletecontact/:id', deleteContactById)

export default ContactRouter;
