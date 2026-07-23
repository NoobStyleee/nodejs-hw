import createError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, 'No file');
    }

    const cloudResult = await saveFileToCloudinary(
      req.file.buffer,
      req.user._id,
    );
    const avatarUrl = cloudResult.secure_url;

    await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { returnDocument: 'after' },
    );

    res.status(200).json({ url: avatarUrl });
  } catch (error) {
    next(error);
  }
};
