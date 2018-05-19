import mongoose from 'mongoose';

const IdSchema = mongoose.Schema({
  user_id: String,
  author_id: String,
  article_id: String
});

const Ids = mongoose.model('Ids', IdSchema);

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      user_id: 0,
      author_id: 0,
      article_id: 0
    });
    newIds.save();
  }
});

export default Ids;