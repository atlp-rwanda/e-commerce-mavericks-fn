interface UserState {
  user?: {
    firstName: string;
    lastName: string;
    gender: string;
    contactNumber: string;
    email: string;
    changePassword: boolean;
    currentPassword: string;
    newPassword: string;
  };
  isLoading: boolean;
  error?: string;
}
 