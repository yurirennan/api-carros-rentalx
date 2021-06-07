interface ICreateUsersDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
}

export default ICreateUsersDTO;
