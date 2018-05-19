import mongoose from 'mongoose';
import collectSchema from '../Schema/collect';

const Collextion = mongoose.model('Collect', collectSchema);

export default Collextion;