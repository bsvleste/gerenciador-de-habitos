import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import dayjs from 'dayjs'
import z from 'zod'
export async function appRoutes(app:FastifyInstance){
   app.post('/habits',async (request)=>{
    const createHabityBody = z.object({
      title:z.string(),
      weekDays:z.array(z.number().min(0).max(6))
    }) 
    const{title,weekDays} = createHabityBody.parse( request.body) 
    const today = dayjs().startOf('day').toDate()
    await prisma.habits.create({
        data:{
          title,
          created_at:today,
          weekDays:{
            create: weekDays.map(weekDay=>{
              return {
                week_day:weekDay
              }
            })
          }
        }
     })    
    })
    app.get('/day',async(request)=>{
      const getDayParams = z.object({
        date:z.coerce.date()
      })
      const {date} = getDayParams.parse(request.query)
      const parseDate = dayjs(date).startOf('day')
      const weekDay = parseDate.get('day')
      const possibleHabits = await prisma.habits.findMany({
        where:{
          created_at:{
            lte:date
          },
          weekDays:{
            some:{
              week_day:weekDay
            }
          }
        }
      })
      const day = await prisma.day.findUnique({
        where:{
          date:parseDate.toDate()
        },
        include:{
          dayHabits:true
        }
      })
      const completedHabits = day?.dayHabits.map(dayHabit=>{
        return dayHabit.habit_id
      })
      return {
        possibleHabits,
        completedHabits
      }
    })
    app.get("/habits",async()=>{
      const habits = await prisma.habits.findMany()
      return habits
    })    
  }