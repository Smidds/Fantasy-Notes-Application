export class AuthUI {
  constructor() {
    this.start = jest.fn();
  }

  static getInstance = jest.fn();
}

export const auth = {
  AuthUI
};
