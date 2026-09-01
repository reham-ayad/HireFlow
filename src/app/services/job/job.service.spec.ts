import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService]
    });

    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return fallback jobs when the external API fails', () => {
    let response: any;

    service.getJobs().subscribe((res) => {
      response = res;
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('adzuna.com')
    );

    req.flush({}, { status: 500, statusText: 'Server Error' });

    expect(response).toBeTruthy();
    expect(response.results.length).toBeGreaterThan(0);
    expect(response.results[0].company.display_name).toBeTruthy();
  });
});
