import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { verify } from "hono/jwt"

export const blogRouter = new Hono<{
    Bindings : { 
        DATABASE_URL : string, 
        JWT_SECRET : string
    }, 
    Variables : {  
        userId : string
    }
}>

blogRouter.post("/test", async( c) => { 
    return c.text("test sucessfull")
})

//middleware 
blogRouter.use("/*", async (c, next) => { 
    const authHeader = c.req.header("authorization") || "";

    const user = await verify(authHeader, c.env.JWT_SECRET); 
        if(user) { 
            c.set("userId", user.id);
            await next();
        } else { 
            c.status(403); 
            return c.json({ 
                Message : "You are not logged in!!"
            })
        }


})


//bulk API 
blogRouter.get("/bulk", async (c) => { 
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findMany({})
        c.status(200)
        return c.json(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.get("/personal", async(c) => { 
    const autherId = c.get("userId")
    console.log(autherId, "Test")
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({ 
            where : { 
                autherId : autherId
            }
        })
        c.status(200)
        return c.json(blogs)
    } catch (error) {
        console.log(error)
    }

})

//Get Blog Post
blogRouter.get("/:id", async (c)=> { 

    const id = c.req.param("id")
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findFirst({ 
            where : { 
                id : id
            }
        })

        c.status(200)
        return c.json({ 
            blogs
        })
    } catch (error) {
        return c.json({ 
            error
        })
        
    }

  })
  

//Post Blog Post
// blogRouter.post("/post", async (c) => { 
//     const body = await c.req.json()
//     const userId = c.get("userId")
//     console.log(userId);

//     const prisma = new PrismaClient({ 
//         datasourceUrl : c.env.DATABASE_URL
//     }).$extends(withAccelerate())

//     try {
//         const blog = await prisma.blog.create({ 
//             data : { 
//                 title : body.title, 
//                 content : body.content,
//                 autherId : userId
//             }
//         })
        
//         c.status(200) 
//         return  c.json({ 
//             blog
//         })
//     } catch (error) {
//         c.status(411)
//         return c.json({ 
//             error
//         })
//     }

//   })


blogRouter.post("/post", async(c) => { 
    const body = await c.req.json()
    const userId = c.get("userId")
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.create({ 
            data : { 
                title : body.title, 
                content : body.content,
                autherId : userId
            }
        })
        c.status(200)
        return c.json({ 
            blog
        })
    } catch (error) {
        c.status(413)
        return console.log(error)
    }

})


blogRouter.put("/", async(c) => { 
    const id = c.get("userId")
    console.log(id)
    const body = await c.req.json()
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const updatedBlog = await prisma.blog.update({ 
            where : { 
                id : body.id,
                autherId : id
            }, 
            data : { 
                title : body.title, 
                content : body.content
            }
        })
        c.status(200)
        return c.json({ 
            Message : "Post Updated!!"
        })
    } catch (error) {
        console.log( error)
    }

})
  


