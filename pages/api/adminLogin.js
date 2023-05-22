import axios from 'axios';
import cookie from 'cookie';
import { loginApi } from 'api';

export default async (req, res) => {
  const adminData = req.body;

  const {
    data: { token },
  } = await loginApi.adminLogin(adminData);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('admin_token', token, {
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
