import { LoginFormField } from './LoginFormField.interface';

export type NewUser = Omit<LoginFormField, 'conformpassword'>;
