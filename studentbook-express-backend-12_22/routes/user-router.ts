/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *              description: User's name.
 *            status:
 *              type: string
 *              description: User's status.
 *            Messages:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  message_id:
 *                    type: number
 *                  tekst:
 *                    type: string
 *                    description: content of the message
 *                  type:
 *                    type: string
 *                    description: indicates if an message is public or private
 *                  datesent:
 *                    type: date
 *                    description: the date when the message was sent
 *      UserInput:
 *          type: object
 *          properties:            
 *            username:
 *              type: string
 *              description: User's name.
 *      StatusInput:
 *          type: object
 *          properties:            
 *            id:
 *              type: number
 *              description: Loggedin ID.
 *            status:
 *              type: string
 *              description: New status.     
 */
import express, { Request, Response, Handler } from 'express';
import { stringify } from 'querystring';
import * as userModel from '../model/user';
import { User } from '../types';

const userRouter = express.Router();


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of users and the messages they have sent
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', (req: Request, res: Response) => {
    userModel.getUsers((err: Error, users: User[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
});


/**
 * @swagger
 * /user/status:
 *   put:
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusInput'
 *      responses:
 *         200:
 *            description: The ID of the logged in user
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
userRouter.put('/status', (req: Request, res: Response) => {
    const id = req.body.id;
    const status = req.body.status;
    userModel.changeStatus(id,status, (err: Error, string: String) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json({status: status});
        }
    }); 
});
/**
 * @swagger
 * /user/login:
 *   post:
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The ID of the logged in user
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
userRouter.post('/login', (req: Request, res: Response) => {
    const username = req.body.username   ;
    
    userModel.getUserWithUsername(username,(error: Error, user: User) =>{
            if(error){
                res.status(403).json({ status: 'error', errorMessage: "Forbidden" });
            }
            else {
                res.status(200).json({ status: 'success', id: user.id});
            }
    }) 
});



/**
 * @swagger
 * /user/{id}:
 *   get:
 *      summary: Get a user by ID
 *      responses:
 *         200:
 *           description: A user
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */


userRouter.get('/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    userModel.getUser(userId, (error: Error, user: User) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json(user);
        }
    });
});

export { userRouter };
