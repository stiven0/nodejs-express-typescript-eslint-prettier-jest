// import { resolve, extname } from 'path';
import { Router } from 'express';
// import multer, { diskStorage } from 'multer';
// import { v4 } from 'uuid';

// constrollers
import * as getUserMethods from '../controllers/users/GET/users';
import * as postUserMethods from '../controllers/users/POST/users';
import * as putUserMethods from '../controllers/users/PUT/users';
import * as deleteUserMethods from '../controllers/users/DELETE/users';

// config storage multer
// const storage = diskStorage({
//     destination: resolve(__dirname, '../../uploads-dev/user'),
//     filename : (req, file, cb) => cb(null, v4() + extname(file.originalname))
// });

// config the uploads files
// const uploadConfig = multer({
//     storage,
//     fileFilter( req, file, next ) {
//       if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
//             next(null, true);
//       } else {
//           next(null, false);
//       }
//     }
// });

const router = Router();

router.get('/users', getUserMethods.getAllUsers);

router.post('/users', postUserMethods.registerUser);

router.put('/users/:userId', putUserMethods.updateUser);

router.delete('/users/:userId', deleteUserMethods.deleteUser);

export default router;
