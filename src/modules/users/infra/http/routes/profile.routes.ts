import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const usersController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', usersController.show);
profileRouter.put('/', usersController.update);

export default profileRouter;
