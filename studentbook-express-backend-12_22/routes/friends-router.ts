/**
 * @swagger
 *   components:
 *    schemas:
 *      Friends:
 *          type: object
 *          properties:
 *            loggedin:
 *              type: number
 *            newfriend:
 *              type: string              
 */
 import express, { Request, Response, Handler } from 'express';
 import * as userModel from '../model/user';
 import { User } from '../types';


const friendsRouter = express.Router()
/**
 * @swagger
 * /friends:
 *   post:
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Friends'
 *      responses:
 *         200:
 *            description: the friend was added
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
friendsRouter.post('/',  (req: Request, res: Response) => {
    const loggedin = req.body.loggedin;
    const newfriend = req.body.newfriend;
    
    userModel.addFriend(loggedin, newfriend, (err: Error, user: User)=>{
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
    }else{
            res.status(200).json({name: user.name , status: user.status })
    }});

});
/**
 * @swagger
 * /friends:
 *   get:
 *      summary: Get a friends of user by ID
 *      responses:
 *         200:
 *           description: users
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      parameters:
 *        - name: id
 *          in: header
 *          description: User ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
friendsRouter.get('/', (req: Request, res: Response) =>{
    const loggedIn = parseInt(req.get('id'));
    userModel.getFriends(loggedIn, (err: Error, user: User[])=>{
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
    }else{
            res.status(200).json(user)
    }
    })
})

export { friendsRouter}