export class User {
  constructor(
    public name: string,
    public email: string,
    public role: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
