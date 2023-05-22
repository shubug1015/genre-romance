import axios from 'axios';

// var api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/',
// });

// var api = axios.create({
//   baseURL:
//     'http://romance-test.eba-22rxmmtn.ap-northeast-2.elasticbeanstalk.com/',
// });

var api = axios.create({
  baseURL: 'https://api.genreisromance.site/',
});

export const loginApi = {
  userLogin: (data) => api.post('users/login/', data),

  adminLogin: (data) => api.post('users/admin_login/', data),
};

export const signUpApi = {
  checkId: (data) => api.get('users/signup/check_id/', { params: data }),

  sendCertification: (data) => api.post('users/signup/generate_code/', data),

  checkCertification: (data) =>
    api.get('users/signup/sms_authentication/', { params: data }),

  signUp: (data) => api.post('users/signup/', data),
};

export const userApi = {
  sendCode: (phoneNum) => api.post('users/change/pw/generate_code/', phoneNum),

  checkCode: (data) =>
    api.get('users/change/pw/sms_authentication/', { params: data }),

  getState: (token) =>
    api.get('users/state/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  checkPw: (pw, token) =>
    api.put('users/check/pw/', pw, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  getInfo: (token) =>
    api.get('users/me/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  changePw: (data, token) =>
    api.put('users/change/pw/', data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  getProfile: (token) =>
    api.get('users/profile/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  registProfile: (data, token) =>
    api.post('users/profile/', data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  getProposal: (token) =>
    api.get('match/get/proposal/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  respondProposal: (token, data) =>
    api.put('match/respond/proposal/', data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  selectMovie: (token, movie_data) =>
    api.put('match/respond/proposal/', movie_data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  answerMovie: (token, movie_data) =>
    api.put('match/respond/answer/', movie_data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  getMovieOptions: (token) =>
    api.get('match/get/movie_options/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  getTicket: (token) =>
    api.get('match/ticket/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  registPhoto: (data, token) =>
    api.post('match/proof_shot/', data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }),

  skipPhoto: (token) =>
    api.put(
      'match/proof_shot/skip/',
      {},
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    ),
  findId: (data) => api.get('users/find/id/', { params: data }),

  findPw: (data) => api.get('users/change/pw/check/', { params: data }),

  changePw: (user_data) => api.put('users/change/pw/', user_data),

  cancelMatch: (token) =>
    api.put(
      'match/cancel/match/',
      {},
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    ),
};

export const galleryApi = {
  getGallery: (page) => api.get(`match/proof_shot?page=${page}`),

  galleryState: () => api.get('admin/gallery/activation/'),
};

export const adminApi = {
  getAllUsers: () => api.get('admin/users/all/'),

  getFilteredAllUsers: (filter, firstAge, lastAge, place) =>
    api.get(
      `admin/users/all?filter=${filter}&age_min=${firstAge}&age_max=${lastAge}&place=${place}`
    ),

  changeGender: (data) => api.put('admin/users/change/', data),

  getUsers: () => api.get('admin/users/match/'),

  getFilteredUsers: (
    maleFilter,
    maleFirstAge,
    maleLastAge,
    malePlace,
    femaleFilter,
    femaleFirstAge,
    femaleLastAge,
    femalePlace
  ) =>
    api.get(
      `admin/users/match?male_filter=${maleFilter}&male_age_min=${maleFirstAge}&male_age_max=${maleLastAge}&male_place=${malePlace}&female_filter=${femaleFilter}&female_age_min=${femaleFirstAge}&female_age_max=${femaleLastAge}&female_place=${femalePlace}`
    ),

  editUserProfile: (data) => api.put('admin/users/profile/', data),

  getCancelUsers: (id) => api.get(`admin/users/cancel?user_id=${id}`),

  sendReminder: (phoneNum) =>
    api.get(`admin/users/reminder?phone_number=${phoneNum}`),

  rejectUser: (data) => api.put('admin/users/reject/', data),

  updateMatch: () => api.put('admin/match/update/'),

  matchUsers: (data) => api.post('admin/match/', data),

  getMatchedUsers: () => api.get('admin/match/'),

  sendTicket: (data) => api.post('admin/ticket/', data),

  getPreTicket: (maleId, femaleId) =>
    api.get(`admin/ticket/pre?male_id=${maleId}&female_id=${femaleId}`),

  resendTicket: (data) => api.put('admin/ticket/', data),

  cancelTicket: (id) => api.put('admin/match/', id),

  deleteMatch: (match_id) => api.delete('admin/match/', { data: { match_id } }),

  getRefundUsers: () => api.get('admin/users/refund/'),

  refundUsers: (data) => api.put('admin/users/refund/', data),

  getGallery: () => api.get('admin/gallery/'),

  galleryState: () => api.get('admin/gallery/activation/'),

  changeGalleryState: (state) => api.put('admin/gallery/activation/', state),

  addGallery: (data) => api.post('admin/gallery/', data),

  editGallery: (data) => api.put('admin/gallery/', data),

  deleteGallery: (proof_shot_id) =>
    api.delete('admin/gallery/', { data: { proof_shot_id } }),
};

export const gaApi = {
  visitors: (dateData) =>
    api.get(
      'admin/analytics/visitors/',
      { params: dateData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),

  funnels: (dateData) =>
    api.get(
      'admin/analytics/funnels/',
      { params: dateData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),

  keywords: (dateData) =>
    api.get(
      'admin/analytics/keywords/',
      { params: dateData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
};
