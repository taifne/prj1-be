/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const { UserRoles,UserPermissions,UserStatus,DefaltImages } = require('../constants');

const { bcryptService } = require('../services');
const { toInteger } = require('../shared');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'LastName is Required'],
      trim: true,
    },
    fullName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: 8,
      select: false,
    },
    avatar: {
      type: String,
      default: DefaltImages.USERAVATAR,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [UserStatus.ACTIVE, UserStatus.DEACTIVATED, UserStatus.PENDDING],
      default: UserStatus.ACTIVE,
    },
    role: {
      type: String,
      enum: [UserRoles.ADMIN, UserRoles.USER],
      default: UserRoles.USER,
    },
    permissions: {
      type: Array,
      default: [UserPermissions.READ],
      items: {
        type: String,
        enum: [
          UserPermissions.READ_POST,
          UserPermissions.UPDATE_POST,
          UserPermissions.DELETE_POST,
          UserPermissions.WRITE_POST,
          UserPermissions.READ_USER,
          UserPermissions.UPDATE_USER,
          UserPermissions.WRITE_USER,
          UserPermissions.DELETE_USER,
          UserPermissions.READ_GROUP,
          UserPermissions.UPDATE_GROUP,
          UserPermissions.WRITE_GROUP,
          UserPermissions.DELETE_GROUP,
        ]
      }
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptService.hashPassword(this.password);
  return next();
});

// Compare password using bcrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcryptService.comparePassword(
    enteredPassword,
    this.password,
  );
  return isMatch;
};

// Check password is changed or not.
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  return next();
});

// If password changed throw error
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = toInteger(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  const { resetToken, resetPasswordExpire, resetPasswordToken } =
    bcryptService.getResetPasswordToken();

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = resetPasswordExpire;
  return resetToken;
};
userSchema.pre('save', function (next) {
  if (this.isModified('firstName') || this.isModified('lastName')) {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
  return next();
});

module.exports = model('User', userSchema);
