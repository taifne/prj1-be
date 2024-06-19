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
  COMMENT: {
    DEFAULT: '/comments',
    ALL:'/',
    DETAIL:'/:id',
    ALLFORQUESTION:'/question/:id',
    CREATE:'/create',
    UPDATE:'/update/:id',
    DELETE:'/delete/:id',
  },
  EVENT: {
    DEFAULT: '/events',
    ALL:'/',
    DETAIL:'/:id',
    CREATE:'/create',
    UPDATE:'/update/:id',
    DELETE:'/delete/:id',
    GETBYGROUP:'/groups'
  },
  QUESTION: {
    DEFAULT: '/questions',
    ALL:'/',
    DETAIL:'/:id',
    CREATE:'/create',
    UPDATE:'/update/:id',
    DELETE:'/delete/:id',
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
    ADDUSER:'/adduser',
    REMOVEUSER:'/removeuser',
  },
  PERMISSION:{
DEFAULT:'/permissions',
    ALL:'/'
  },
  HEALTH: '/health',
};

module.exports = { Routes };
