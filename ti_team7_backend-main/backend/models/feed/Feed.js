//Author : Aeshna Verma (B00880776)

const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema(
  {
    feedId: { type: Number, required: true },
    userName: { type: String, required: true },
    feedText: { type: String},
    congratsBadge : {type: Number, default:0},
    fabBadge : {type: Number, default:0},
    perfectBadge : {type: Number, default:0},
    awesomeBadge : {type: Number, default:0},
    yaayBadge : {type: Number, default:0},
    applauseBadge : {type: Number, default:0},
    celebrteBadge : {type: Number, default:0},
    strongBadge : {type: Number, default:0}
  },
  { timestamps: true }
)

module.exports = mongoose.model('feed', FeedSchema)
