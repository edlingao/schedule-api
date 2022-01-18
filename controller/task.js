import Schedule from '../models/Schedule.js'
import User from '../models/User.js'

import Task from '../models/Task.js'

export default class TaskController {
    static async find(req, res){
        const {id} = req.params
        try {
          const task = await Task.find({_id: id})
          res.json(task)
        } catch(err) {
          res.json(err)
        }
    }

    static async create(req, res) {
      const { tetramino } = req.params
      const {title} = req.body
      const Tetramino = await Schedule.findOne({_id: tetramino})

      const task = new Task({title, tetramino: Tetramino, owner: req.user, day: Tetramino.week_day })
      try {
        let response = await task.save()
        res.json(response)
      } catch(err) {
        res.json(err)
      }
    }

    static async edit(req, res){
      const {id} = req.params
      const { new_title, new_status } = req.body
      try {
        const task = await Task.findOneAndUpdate({_id: id}, {title: new_title, status: new_status}, {new: true})
        res.json(task)
      } catch(err) {
        res.json(err)
      }
    }

    static async destroy(req, res){
      const {id} = req.params
      try {
        const response = await Task.deleteOne({ _id: id, owner: req.user })
        res.json(response)
      } catch (err) {
        res.json(err)
      }
    }

    static async allTasksFromTetramino(req, res){
      const { tetramino } = req.params
      try {
        const data = await Task.find({owner: req.user, tetramino});
        res.json(data);
      } catch(err) {
        res.json(err);
      }
    }

    static async allTaskFromDay(req, res) {
      const { day } = req.params
      try {
        const data = await Task.find({owner: req.user, day})
        res.json(data)
      } catch(err) {
        res.json(err)
      }
    }
}