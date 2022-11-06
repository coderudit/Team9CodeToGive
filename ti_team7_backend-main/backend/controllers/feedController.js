const { update } = require('../models/feed/Feed')
const Feed = require('../models/feed/Feed')

  exports.getAllFeed = async (req, res, next) => {
  
    
    const user = req.params.user 
    

    try {
      const feeds = await Feed.find({ userName: {$ne: user} })

      if (feeds.length > 0) {
        const successResponse = {
          message: 'Feed fetched successfully',
          success: true,
          feeds: feeds,
        }
        res.status(200).json(successResponse)
      } else {
        const infoMsgResponse = {
          message: 'No updates from any users',
          success: true,
        }
        res.status(201).json(infoMsgResponse)
      }
    } catch (err) {
      const errorResponse = {
        message: err,
        success: false,
      }
      res.status(500).json(errorResponse)
    }
  }

 
exports.addFeed = async (req, res, next) => {


 const feedid = Date.now().toString()
 const userName = req?.body?.userName || "aeshna"
 const feedtext = req?.body?.feedText || "i ate breakfast"

 const newFeed = new Feed({
  feedId: feedid,
  userName: userName,
  feedText: feedtext,
  congratsBadge : 0,
  fabBadge : 0,
  perfectBadge : 0,
  awesomeBadge : 0,
  yaayBadge : 0,
  applauseBadge : 0,
  celebrteBadge :0,
  strongBadge : 0
 })

 try {
   const addfed = await newFeed.save()
   const successResponse = {
     message: 'Feed added successfully',
     success: true,
   }
   res.status(200).json(successResponse)
 } catch (err) {
   const errorResponse = {
     message: err,
     success: false,
   }
   res.status(500).json(errorResponse)
 }

}
 

exports.updateBadges = async (req, res, next) => {

  
   const feednum = req.params.feedid
   const badge = req?.body?.badge || "congratsBadge" 

   try{
  const updatedfeed = await Feed.findOneAndUpdate(
    {feedId : feednum},
    {$inc: { [badge] : 1}}
    )

    if(updatedfeed){
      const successResponse = {
        message: 'badge updated successfully ',
        success: true
      }
      res.status(200).json(successResponse)
    }
    else{
      const errorResponse = {
        message: 'No feedid found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
    
  }
  catch(error)
  {
    const errorResponse = {
      message: error,
      success: false,
    }
    res.status(500).json(errorResponse)
  }

  }
   

  exports.getUserProfileBadges = async (req, res, next) => {
     
    const user = req?.params?.user

    try {
      const feeds = await Feed.find({ userName:  user })

      if (feeds.length > 0) {
        const successResponse = {
          message: 'Feed fetched successfully',
          success: true,
          feeds: feeds,
        }
        res.status(200).json(successResponse)
      } else {
        const errorResponse = {
          message: 'No Feeds avaialble',
          success: true,
        }
        res.status(201).json(errorResponse)
      }
    } catch (err) {
      const errorResponse = {
        message: err,
        success: false,
      }
      res.status(500).json(errorResponse)
    }
  }
