import cookie from 'cookie';

export default async (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('user_data', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );

  res.statusCode = 200;
  res.json({ success: true });
};
