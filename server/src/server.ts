import  Fastifay from 'fastify'
import { prisma } from './lib/prisma';

const app = Fastifay();

app.get('/',async ()=>{
    const habits = await prisma.habits.findMany()
    return habits
})

app.listen({
    port:3333
}).then(()=>console.log('server is on fire'))