
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput, createBlogInput } from "@pkulchandra/medium-common-package";

import { Hono } from "hono";
export const userRouter = new Hono<{
    Bindings : { 
        DATABASE_URL : string, 
        JWT_SECRET : string
    }
}>();



userRouter.post("/signup", async(c) => { 
  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)
  if (!success) { 
    c.status(411)
    return c.json({Message : "Check Input and try again!!"})
  }
    const prisma = new PrismaClient({ 
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    
    try {
      const user = await prisma.user.create({ 
        data : { 
          email : body.email,
          name : body.name,
          password : body.password
  
        }, select : { 
          email : true,
          id : true
        }
      })
      const jwt = await sign({ 
        id : user.id
      }, c.env.JWT_SECRET)
      return c.text(jwt)
    } catch (error) {
      console.log(error)
      c.status(411)
      return c.text("Server Error")
    }
  })
  
userRouter.post("/signin", async (c) => { 
  const body = await c.req.json()
  const { success} =  signinInput.safeParse(body)
  if (!success) { 
    c.status(403)
    return c.json({
      Message : "Invalid Input"
    })
  }
    const prisma = new PrismaClient({ 
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.findFirst({ 
        where : { 
          email : body.email, 
          password : body.password
        }, select : { 
          email : true, 
          id : true
        }
      })
      if(!user) { 
        c.status(403)
        return c.json({ 
          message : "Invalid Creadentials try again!!", 
        })
      }
  
      const jwt = await sign({
        id : user.id
      }, c.env.JWT_SECRET)
      return c.json({ jwt : jwt, email : user.email})
  
  
    } catch (error) {
        c.status(411)
      return c.json({ 
        error : error
      })
    }
  
  })