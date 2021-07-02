import { Router } from 'express';


const router = Router();

router.route('/').post().get();
router.route('/:id').get().delete().put();
router.route('/categories').get().post()
router.route('/categories/:id').put().delete()

export default router;