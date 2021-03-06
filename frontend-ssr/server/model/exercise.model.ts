import mongoose from 'mongoose';
import { ChapterType } from '~/shared-types';
import { validateAgainstSchemaProps, validateObjectid } from '../database';
import { ServerError } from '../ServerUtils';

const ExercisesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: [ChapterType.HTML, ChapterType.CSS, ChapterType.JS] },
    tags: [{ type: String }],
    body: { type: String, required: true },
    starting_code: { type: String },
    solution: { type: String, required: true },
    private: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Exercise = mongoose.models.Exercise || mongoose.model('Exercise', ExercisesSchema);

class ExerciseModel {
  static getAllPublic() {
    return Exercise.find({ private: false });
  }

  static getOwnExercises(userId: string) {
    return Exercise.find({
      user: userId,
      private: true,
    });
  }

  static get(_id) {
    validateObjectid(_id);
    return Exercise.findById(_id);
  }

  static create(payload) {
    validateAgainstSchemaProps(payload, ExercisesSchema);

    const exercise = new Exercise(payload);

    return new Promise((resolve, reject) => {
      exercise.save((err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }

  static async update(_id: string, payload) {
    validateObjectid(_id);
    const exercise: mongoose.Document = await Exercise.findById(_id);

    if (!exercise) {
      throw new ServerError(404, `Couldn't update non-existent exercise with id=${_id}.`);
    }

    validateAgainstSchemaProps(payload, ExercisesSchema);
    Object.assign(exercise, payload);

    return exercise.save();
  }

  static async delete(_id) {
    validateObjectid(_id);

    const exercise = await Exercise.findById(_id);

    if (!exercise) {
      throw new ServerError(404, `Couldn't delete non-existent exercise with id=${_id}.`);
    }

    return new Promise<void>((resolve, reject) => {
      exercise.delete((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
}

export default ExerciseModel;
