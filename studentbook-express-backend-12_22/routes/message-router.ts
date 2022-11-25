/**
 * @swagger
 *   components:
 *    schemas:
 *      Message:
 *          type: object
 *          properties:
 *            user_id:
 *              type: number
 *            tekst:
 *              type: string
 *              description: content of the message
 *            type: 
 *              type: string
 *              description: indicates if an message is public or private 
 *            date:
 *              type: string
 *              description: the date when the message was sent
 */
 import express, { Request, Response, Handler } from 'express';
 import * as messageModel from '../model/message';
 import { Message } from '../types';


const messageRouter = express.Router()

/**
 * @swagger
 * /messages:
 *   get:
 *      summary: Get a list of the last 5 messages of friend
 *      responses:
 *         200:
 *           description: A list of 5 messages from user
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Message'
 *      parameters:
 *        - name: id
 *          in: header
 *          description: User ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
messageRouter.get('/' , (req: Request, res: Response) =>{
    const loggedin = parseInt(req.get('id'));
    messageModel.getLast5MessagesOfFriend(loggedin,(err: Error, messages: Message[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(messages);
        }
    });
} );


/**
 * @swagger
 * /messages:
 *   post:
 *      summary: post a message
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      responses:
 *         200:
 *            description: status success
 *            
 */
messageRouter.post('/',(req: Request, res: Response) => {
    const tekst =  req.body.tekst;
    const userid = req.body.userid;
    const date = req.body.date;
    const type = req.body.type;

 
    messageModel.addMessage(tekst ,  date , type, userid,(err: Error) =>{
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json({status : "succes"});
        }
    } )  
}) 

export { messageRouter}