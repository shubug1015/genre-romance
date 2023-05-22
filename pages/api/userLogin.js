import axios from 'axios';
import cookie from 'cookie';
import { loginApi } from 'api';

export default async (req, res) => {
  const userData = req.body;

  const {
    data: { token, user_pk, sex },
  } = await loginApi.userLogin(userData);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('user_data', JSON.stringify({ token, user_pk, sex }), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 14, // 2주
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    })
  );

  res.statusCode = 200;
  res.json({ success: true });
};
