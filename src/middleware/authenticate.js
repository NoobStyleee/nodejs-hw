import createError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken, sessionId } = req.cookies;

    if (!accessToken) throw createError(401, 'Missing access token');
    if (!sessionId) throw createError(401, 'Missing session ID');

    const session = await Session.findOne({ accessToken, _id: sessionId });
    if (!session) throw createError(401, 'Session not found');

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      throw createError(401, 'Access token expired');
    }

    const user = await User.findById(session.userId);
    if (!user) throw createError(401);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
