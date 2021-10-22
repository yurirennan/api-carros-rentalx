interface IDateProvider {
  createDate(): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
