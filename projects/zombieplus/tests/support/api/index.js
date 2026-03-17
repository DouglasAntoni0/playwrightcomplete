import { expect } from '@playwright/test';

export class Api {
  constructor(request) {
    this.request = request;
    this.token = undefined;
  }

  async setToken() {
    const response = await this.request.post('http://localhost:3333/sessions', {
      data: {
        email: 'admin@zombieplus.com',
        password: 'pwd123'
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    this.token = `Bearer ${body.token}`;
  }

  async postMovie(movie) {
    await this.setToken();

 const response = await this.request.post('http://localhost:3333/movies', {
      headers: {
        Authorization: this.token,
        Accept: 'application/json, text/plain, */*'
      },
      multipart: {
        title: movie.title,
        overview: movie.overview,
        company_id: '99e1e63e-c787-43ca-a9db-fc8a1579e529',
        release_year: movie.release_year,
        featured: movie.featured
      }
    });

    expect(response.ok()).toBeTruthy();
  }
}