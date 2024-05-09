
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'

import { Hono } from "hono";
export const userRouter = new Hono<{
    Bindings : { 
        DATABASE_URL : string, 
        JWT_SECRET : string
    }
}>();



userRouter.post("/signup", async(c) => { 
    const prisma = new PrismaClient({ 
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    try {
      const user = await prisma.user.create({ 
        data : { 
          email : body.email,
          name : body.name,
          password : body.password
  
        }
      })
      const jwt = await sign({ 
        id : user.id
      }, c.env.JWT_SECRET)
      return c.json({jwt : "Bearer " + jwt})
    } catch (error) {
      console.log(error)
      c.status(411)
      return c.text("Invalid Input")
    }
  })
  
userRouter.post("/signin", async (c) => { 
    
    const prisma = new PrismaClient({ 
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
  
    try {
      const user = await prisma.user.findFirst({ 
        where : { 
          email : body.email, 
          password : body.password
        }
      })
      if(!user) { 
        c.status(403)
        return c.json({ 
          message : "Invalid Creadentials try again!!"
        })
      }
  
      const jwt = await sign({
        id : user.id
      }, c.env.JWT_SECRET)
      return c.json({
        JWT : jwt
      })
  
  
    } catch (error) {
        c.status(411)
      return c.json({ 
        error : error
      })
    }
  
  })