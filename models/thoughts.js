const { Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat")

const ReactionSchema = new Schema ({
  reactionId : {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
  },

  reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
  },

  username: {
      type: String,
      required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
   get: (timestamp) => dateFormat(timestamp)
  },
},
{
  toJSON: {
      virtuals: true,
      getters: true,
  },
  id: false,
},
);




const thoughtsSchema = new Schema(
  {
    thought: {
      type: String,
      required: "Enter thought",
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
     get: (timestamp) => dateFormat(timestamp, "yyyy-mm-dd HH:MM:ss"),
    },

    userName: {
      type: String,
      required: true,
    },

    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactioncount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtsSchema);


module.exports = Thoughts;