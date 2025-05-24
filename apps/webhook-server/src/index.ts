import express from "express"
import { prisma } from "@repo/db";

const app = express();

app.post('/hdfcWebhook', async(req, res)=>{

    const paynmentInfo = {
        token : req.body.token,
        userId : req.body.user_identifire,
        amount : req.body.amount
    }

    try{

        await prisma.$transaction([

            prisma.balance.update({
                where : {
                    userId : paynmentInfo.userId
                },
                data : {
                    amount : {
                        increment : paynmentInfo.amount
                    }
                }
            }),

            prisma.onRampTransaction.update({
                where : {
                    token : paynmentInfo.token
                },
                data : {
                    status : "Success"
                }
            })
        ])

        res.status(200).json({
            message : "Captured"
        })
    }
    catch(e){
        console.log(e)
        res.status(411).json({
            message : "Error while processing webhook"
        })
    }

})

app.listen(3003)

