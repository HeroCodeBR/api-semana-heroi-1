import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { upload } from '../config/multer';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
class UsersRoutes {
  private router: Router;
  private usersController: UsersController;
  private authMiddleware: AuthMiddleware;
  constructor() {
    this.router = Router();
    this.usersController = new UsersController();
    this.authMiddleware = new AuthMiddleware();
  }
  getRoutes(): Router {
    this.router.post(
      '/',
      this.usersController.store.bind(this.usersController),
    );
    this.router.put(
      '/',
      upload.single('avatar_url'),
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.usersController.update.bind(this.usersController),
    );

    this.router.post(
      '/auth',
      this.usersController.auth.bind(this.usersController),
    );
    this.router.post(
      '/refresh',
      this.usersController.refresh.bind(this.usersController),
    );

    return this.router;
  }
}

export { UsersRoutes };
