import {Router} from 'express';
import { createMembership, deleteMembershipById, getMembershipById, getMemberships, updateMembershipById } from '../controllers/membershipController.js';

const MembershipRouter = Router();

MembershipRouter.post('/addMembership', createMembership)

MembershipRouter.get('/getMembership', getMemberships)

MembershipRouter.get('/getMembershipById/:id', getMembershipById)

MembershipRouter.put('/updateMembership/:id', updateMembershipById)

MembershipRouter.delete('/deleteMembership/:id', deleteMembershipById)

export default MembershipRouter;