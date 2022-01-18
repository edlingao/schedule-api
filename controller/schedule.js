import Schedule from '../models/Schedule.js';
import Moment from 'moment';
import { default as ExtendMoment } from 'moment-range';
const { extendMoment } = ExtendMoment;
const moment = extendMoment(Moment);
import { scheduleValidatiom } from '../auth/validation.js'
import Task from '../models/Task.js';
export default class ScheduleController{

    static async edit(req, res) {
        const { id } = req.params
        const { title } = req.body
        try {
            const schedule = await Schedule.findOneAndUpdate({_id: id}, {title: title}, {new: true})
            res.json(schedule)
        } catch (err) {
            res.json(err)
        }
    }

    static async create(req, res){

        const newSchedule = {...req.body, owner: req.user};
        const format = 'HH:mm';
        const isConsecutive = moment(newSchedule.start_hour, format).isBefore(moment(newSchedule.end_hour, format))
        const {error} = scheduleValidatiom(newSchedule)
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        Schedule.find({ week_day: newSchedule.week_day, owner: req.user }).then(async (thisDayActivities) => {
            const noOverLaps = thisDayActivities.every(({ end_hour, start_hour }) => {
                const requestedStart = moment(newSchedule.start_hour, format)
                const requestedEnd = moment(newSchedule.end_hour, format)

                const requestedRange = moment.range(requestedStart, requestedEnd, format)

                const comparedStart = moment(start_hour, format)
                const comparedEnd = moment(end_hour, format)

                const comparedRange = moment.range(comparedStart, comparedEnd, format)

                return !requestedRange.overlaps(comparedRange)
            });
            if (noOverLaps && isConsecutive) {
                const scheduleInstance = new Schedule(newSchedule)
                let response = await scheduleInstance.save()
                res.json(response)
            } else {
                let message = ''
                ! noOverLaps ? (() => {
                    message = 'Ese rango de horas ya esta ocupado'
                })() : false;
                ! isConsecutive ? (() => {
                    message = 'Las horas no son consecutivas'
                })() : false
                res.json({ status: false, message })
            }
        });
    }
    static async destroy(req, res){
        
        try {
            const deletedTasks = await Task.deleteMany({tetramino: req.params.id, owner: req.user})
            const response = await Schedule.deleteOne({ _id: req.params.id, owner: req.user })
            res.json({response, deletedTasks})
        } catch(err) {
            res.json(err)
        }
    }
    static async update(req, res){

    }
    static async scheduleDays( req, res){
        const activitiesForTheNextDays = []
        const today = moment().day(req.params.day).day()
        const format = 'HH:mm'
    
        for (let i = 0; i <= 3; i++) {
            const day = moment().day(today + i).format('dddd').toLowerCase()
            const activities = await Schedule.find({ week_day: day, owner: req.user })
            activities
                .sort((activity, nextActivity) => {
                    const fisrtHour = moment(activity.end_hour, format)
                    const secondHour = moment(nextActivity.start_hour, format)
                    //activity < nextActivity
                    if (fisrtHour.isAfter(secondHour)) {
                        return -1;
                    }
                })
                .reverse();
    
            activitiesForTheNextDays.push({ day, activities })
        }
        res.json(activitiesForTheNextDays)
    }
}