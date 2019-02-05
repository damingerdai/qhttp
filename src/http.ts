import request from 'request';
import { Model, Method } from './model';

/**
 * http服务接口
 */
interface IHttpService {

    /**
     * 发送get请求
     * @param url 请求连接
     * @param data 数据
     * @param header 请求头
     */
    get<T>(url: string, data: Model<string>, header: Model<string>): Promise<T>;

    /**
     * 发送post请求
     * @param url 请求连接 
     * @param data 数据
     * @param header 请求头
     */
    post<T>(url: string, data: Model<string>, header: Model<string>): Promise<T>;

    /**
     * 发送put请求
     * @param url 请求连接
     * @param data 数据
     * @param header 请求头
     */
    put<T>(url: string, data: Model<string>, header: Model<string>): Promise<T>;

    /**
     * 发送delte请求
     * @param url 请求连接
     * @param header 请求头
     */
    delete<T>(url: string, header: Model<string>): Promise<T>;

    /**
     * 发送http请求
     * @param method 请求方法
     * @param url 请求的连接
     * @param data 请求体数据
     * @param params 请求数据
     * @param header 请求体
     */
    http<T>(method: string, url: string, data: Model<string>, params: Model<string>, header: Model<string>): Promise<T>;
}

export class HttpService implements IHttpService {

    get<T>(url: string, data: Model<string>, header: Model<string>): Promise<T> {
        return this.http('get', url, {}, data, header);
    }

    post<T>(url: string, data: Model<string>, header: Model<string>): Promise<T> {
        return this.http('post', url, data, {}, header);
    }

    put<T>(url: string, data: Model<string>, header: Model<string>): Promise<T> {
        return this.http('put', url, data, {}, header);
    }

    delete<T>(url: string, header: Model<string>): Promise<T> {
        return this.http('delete', url, {}, {}, header);
    }

    http<T>(method: Method, url: string, data: Model<string>, params: Model<string>, headers: Model<string>): Promise<T> {
        const promise = (resolve: (value: T) => void, reject: (error: any) => void) => {
            request({
                method: method,
                url: url,
                headers: headers || {},
                qs: params || {},
                body: data || {},
                json: true
            }, (error: any, response: { statusCode: number; }, body: T) => {
                if (!error && response.statusCode == 200) {
                    resolve(body as T);
                } else {
                    reject(error || 'http error');
                }
            });
        }
        return new Promise(promise);
    }

}