const Routes = {
  AUTH: {
    DEFAULT: '/auth',
    LOGIN: '/login',
    LOGOUT: '/logout',
    SIGNUP: '/signup',
    ME: '/me',
    FORGOT_PASSWORD: '/forgotPassword',
    RESET_PASSWORD: '/resetPassword/:resetToken',
  },
  USER: {
    DEFAULT: '/users',
    ALL: '/',
    DETAIL: '/:id',
  },
  STUDY_POST:{
    DEFAULT:"/studys",
    ALL:"/",
    DETAIL:"/:id",
    CREATE:"/create",
  },
  GROUP_USER: {
    DEFAULT: '/groups',
    ALL: '/',
    DETAIL: '/:id',
  },
  PERMISSION:{
DEFAULT:'/permissions',
    ALL:'/'
  },
  HEALTH: '/health',
};

module.exports = { Routes };
