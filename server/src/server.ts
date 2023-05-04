import  Fastifay from 'fastify'
import cors from '@fastify/cors'
import{appRoutes} from './routes'
const app = Fastifay();
app.register(cors)
app.register(appRoutes)

app.listen({
    port:3333,
    host:"0.0.0.0",
}).then(()=>console.log('server is on fire'))
