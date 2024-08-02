import { Router } from 'express';

const router = Router();

import { createTrip, getTrip, updateTrip, deleteTrip, getUserTrips , getAllTrips} from '../controllers/tripController.js';

router.post('/create', createTrip);
router.get('/getAllTrips' ,getAllTrips )
router.get('/:id', getTrip);
router.get('/user-trips/:id', getUserTrips);
router.put('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);

export default router;
