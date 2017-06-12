import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

/**
 * Generic application http service, all http request must go through this
 * service.
 * It provides data extraction and error handling in one place.
 *
 *
 * REVIEW: Angular/http might serialize to json by default in the future.
 * We could pass objects into the post, put and patch requests.
 *
 * REVIEW: Angular/http might extract data from json by default in the future.
 */
@Injectable()
export class HttpService {
    private errorHandlers: ((response: Response) => void)[] = [];

    public constructor(private http: Http) {}

    /**
     * Generic get request.
     *
     * @param url
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public get<T>(url: string, requestOptions: RequestOptionsArgs = null): Observable<T> {
        if (!requestOptions) {
            requestOptions = this.defaultRequestOptions();
        }
        return this.handleResponse<T>(this.http.get(url, requestOptions));
    }

    /**
     * Generic post request.
     *
     * @param url
     * @param data
     * @param requestOptions
     * @returns {Observable<T>}
     */
    public post<T>(url: string, data: any, requestOptions: RequestOptionsArgs = null):
        Observable<T> {
        if (!requestOptions) {
            requestOptions = this.defaultRequestOptions();
        }
        requestOptions.body = data;
        return this.handleResponse<T>(this.http.post(url, data, requestOptions));
    }

    /**
     * Generic put request.
     *
     * @param url
     * @param data
     * @param requestOptions
     * @returns {Observable<T>}
     */
    public put<T>(url: string, data: string, requestOptions: RequestOptionsArgs = null):
        Observable<T> {
        if (!requestOptions) {
            requestOptions = this.defaultRequestOptions();
        }
        requestOptions.body = data;
        return this.handleResponse<T>(this.http.put(url, data, requestOptions));
    }

    /**
     * Generic delete request.
     *
     * @param url
     * @param requestOptions
     * @returns {Observable<T>}
     */
    public delete<T>(url: string, requestOptions: RequestOptionsArgs = null): Observable<T> {
        if (!requestOptions) {
            requestOptions = this.defaultRequestOptions();
        }
        return this.handleResponse<T>(this.http.delete(url, requestOptions));
    }

    /**
     * Generic patch request.
     *
     * @param url
     * @param data
     * @param requestOptions
     * @returns {Observable<T>}
     */
    public patch<T>(url: string, data: string, requestOptions: RequestOptionsArgs = null):
        Observable<T> {
        if (!requestOptions) {
            requestOptions = this.defaultRequestOptions();
        }
        requestOptions.body = data;
        return this.handleResponse<T>(this.http.patch(url, data, requestOptions));
    }

    /**
     * Generic head request.
     *
     * @param url
     * @param requestOptions
     * @returns {Observable<T>}
     */
    public head<T>(url: string, requestOptions: RequestOptionsArgs = null): Observable<T> {
        return this.handleResponse<T>(this.http.head(url, requestOptions));
    }

    /**
     * Set handler to be called if response has http status less than 200 or more
     * than 300.
     *
     * @param errorHandler
     */
    public setErrorHandler(errorHandler: (response: Response) => void): void {
        this.errorHandlers.push(errorHandler);
    }

    /**
     * Handles response and errors.
     *
     * @param response
     * @returns {Observable<T>}
     */
    private handleResponse<T>(response: Observable<Response>): Observable<T> {
        return response.map(this.extractData).catch(this.handleError);
    }

    /**
     * Extracts json data from response.
     *
     * @param response
     * @returns {any}
     */
    private extractData =
        (response: Response) => {
            if (!response.ok) {
                this.errorHandlers.map(errorHandler => errorHandler(response));
                return;
            }

            // response.json() does return _body property of Response if it isn't typeof string or
            // instance of ArrayBuffer
            if (response.json() instanceof Blob) {
                return response.blob();
            }

            return response.json();
        }
    /**
     * Handles error that might arise during request.
     *
     * @param error
     * @returns {any}
     */
    private handleError =
        (error: Response) => {
            this.errorHandlers.map(errorHandler => errorHandler(error));
            return Observable.throw(error);
        }
    /**
     * Default options set content type.
     *
     * @returns {RequestOptionsArgs}
     */
    public defaultRequestOptions(): RequestOptionsArgs {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return new RequestOptions({headers: headers, body: '', withCredentials: true});
    }

    /**
     * File upload request options.
     *
     * @returns {RequestOptions}
     */
    public fileUploadRequestOptions(): RequestOptionsArgs {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        return new RequestOptions({headers: headers, withCredentials: true});
    }
}
